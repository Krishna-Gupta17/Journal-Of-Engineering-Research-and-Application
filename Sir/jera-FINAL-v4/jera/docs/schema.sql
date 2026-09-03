-- ============================================================
-- JERA — Journal of Engineering Research Application
-- PostgreSQL Database Schema
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm"; -- for full-text search

-- ─── ENUMS ───────────────────────────────────────────────────

CREATE TYPE user_role AS ENUM (
  'author', 'reviewer', 'editor', 'associate_editor',
  'managing_editor', 'editor_in_chief', 'admin'
);

CREATE TYPE article_type AS ENUM (
  'research_article', 'review_article', 'case_study',
  'short_communication', 'technical_note', 'editorial'
);

CREATE TYPE article_status AS ENUM (
  'draft', 'submitted', 'under_initial_review',
  'sent_for_review', 'under_review', 'revision_requested_minor',
  'revision_requested_major', 'revision_submitted',
  'accepted', 'in_production', 'published', 'rejected',
  'withdrawn', 'retracted'
);

CREATE TYPE review_recommendation AS ENUM (
  'accept', 'minor_revision', 'major_revision', 'reject', 'pending'
);

CREATE TYPE announcement_type AS ENUM (
  'general', 'call_for_papers', 'deadline', 'update', 'news'
);

-- ─── USERS ───────────────────────────────────────────────────

CREATE TABLE users (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email           VARCHAR(255) UNIQUE NOT NULL,
  password_hash   VARCHAR(255),
  first_name      VARCHAR(100) NOT NULL,
  last_name       VARCHAR(100) NOT NULL,
  title           VARCHAR(50),                     -- Dr., Prof., Mr., Ms.
  affiliation     TEXT,
  department      TEXT,
  country         VARCHAR(100),
  role            user_role NOT NULL DEFAULT 'author',
  orcid           VARCHAR(20),
  bio             TEXT,
  website         VARCHAR(500),
  phone           VARCHAR(30),
  specializations TEXT[],                          -- array of expertise areas
  is_active       BOOLEAN NOT NULL DEFAULT TRUE,
  email_verified  BOOLEAN NOT NULL DEFAULT FALSE,
  avatar_url      TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_login_at   TIMESTAMPTZ
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_country ON users(country);

-- ─── VOLUMES & ISSUES ────────────────────────────────────────

CREATE TABLE volumes (
  id          SERIAL PRIMARY KEY,
  number      INTEGER NOT NULL UNIQUE,
  year        INTEGER NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE issues (
  id              SERIAL PRIMARY KEY,
  volume_id       INTEGER NOT NULL REFERENCES volumes(id),
  number          INTEGER NOT NULL,
  title           VARCHAR(500),                    -- optional special issue title
  month           VARCHAR(20),
  year            INTEGER NOT NULL,
  published_at    DATE,
  is_current      BOOLEAN NOT NULL DEFAULT FALSE,
  cover_image_url TEXT,
  description     TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(volume_id, number)
);

CREATE INDEX idx_issues_volume ON issues(volume_id);
CREATE INDEX idx_issues_current ON issues(is_current);

-- ─── ARTICLES ────────────────────────────────────────────────

CREATE TABLE articles (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tracking_number     VARCHAR(30) UNIQUE NOT NULL,  -- e.g. JERA-2026-001
  title               TEXT NOT NULL,
  abstract            TEXT,
  keywords            TEXT[],
  discipline          VARCHAR(200),
  article_type        article_type NOT NULL DEFAULT 'research_article',
  status              article_status NOT NULL DEFAULT 'submitted',

  -- Issue assignment (set on acceptance)
  issue_id            INTEGER REFERENCES issues(id),
  pages               VARCHAR(50),                  -- e.g. "1-18"
  article_number      INTEGER,                      -- sequential within issue
  doi                 VARCHAR(200) UNIQUE,

  -- Dates
  submitted_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  revised_at          TIMESTAMPTZ,
  accepted_at         TIMESTAMPTZ,
  published_at        TIMESTAMPTZ,

  -- Files
  manuscript_url      TEXT,                         -- Cloudflare R2 URL
  revised_url         TEXT,
  published_pdf_url   TEXT,
  cover_letter_url    TEXT,

  -- Editor assignment
  handling_editor_id  UUID REFERENCES users(id),

  -- Metrics
  views               INTEGER NOT NULL DEFAULT 0,
  downloads           INTEGER NOT NULL DEFAULT 0,
  citations           INTEGER NOT NULL DEFAULT 0,

  -- Declarations
  has_ethics_approval  BOOLEAN,
  conflict_of_interest TEXT,
  funding_statement    TEXT,
  data_availability    TEXT,

  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_articles_status ON articles(status);
CREATE INDEX idx_articles_issue ON articles(issue_id);
CREATE INDEX idx_articles_editor ON articles(handling_editor_id);
CREATE INDEX idx_articles_submitted ON articles(submitted_at);
CREATE INDEX idx_articles_doi ON articles(doi);
CREATE INDEX idx_articles_tracking ON articles(tracking_number);

-- Full text search
ALTER TABLE articles ADD COLUMN search_vector tsvector
  GENERATED ALWAYS AS (
    to_tsvector('english', coalesce(title, '') || ' ' ||
    coalesce(abstract, '') || ' ' ||
    coalesce(array_to_string(keywords, ' '), ''))
  ) STORED;
CREATE INDEX idx_articles_search ON articles USING GIN(search_vector);

-- ─── ARTICLE AUTHORS ─────────────────────────────────────────

CREATE TABLE article_authors (
  id                  SERIAL PRIMARY KEY,
  article_id          UUID NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
  user_id             UUID REFERENCES users(id),    -- NULL if non-registered author
  author_order        INTEGER NOT NULL,
  first_name          VARCHAR(100) NOT NULL,
  last_name           VARCHAR(100) NOT NULL,
  email               VARCHAR(255) NOT NULL,
  affiliation         TEXT,
  country             VARCHAR(100),
  orcid               VARCHAR(20),
  is_corresponding    BOOLEAN NOT NULL DEFAULT FALSE,
  UNIQUE(article_id, author_order)
);

CREATE INDEX idx_article_authors_article ON article_authors(article_id);
CREATE INDEX idx_article_authors_user ON article_authors(user_id);

-- ─── REVIEWS ─────────────────────────────────────────────────

CREATE TABLE reviews (
  id                    UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  article_id            UUID NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
  reviewer_id           UUID NOT NULL REFERENCES users(id),
  round                 INTEGER NOT NULL DEFAULT 1,

  -- Invitation
  invited_at            TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  invitation_deadline   TIMESTAMPTZ,
  accepted_at           TIMESTAMPTZ,
  declined_at           TIMESTAMPTZ,
  declined_reason       TEXT,

  -- Review
  due_date              TIMESTAMPTZ,
  submitted_at          TIMESTAMPTZ,
  recommendation        review_recommendation NOT NULL DEFAULT 'pending',

  -- Evaluation scores (1–5)
  score_originality     SMALLINT CHECK (score_originality BETWEEN 1 AND 5),
  score_methodology     SMALLINT CHECK (score_methodology BETWEEN 1 AND 5),
  score_significance    SMALLINT CHECK (score_significance BETWEEN 1 AND 5),
  score_presentation    SMALLINT CHECK (score_presentation BETWEEN 1 AND 5),
  score_references      SMALLINT CHECK (score_references BETWEEN 1 AND 5),

  -- Comments
  comments_to_editor    TEXT,                        -- confidential
  comments_to_author    TEXT,                        -- sent to author

  -- Conflict of interest
  has_conflict          BOOLEAN NOT NULL DEFAULT FALSE,
  conflict_detail       TEXT,

  is_active             BOOLEAN NOT NULL DEFAULT TRUE,
  created_at            TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at            TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_reviews_article ON reviews(article_id);
CREATE INDEX idx_reviews_reviewer ON reviews(reviewer_id);
CREATE INDEX idx_reviews_recommendation ON reviews(recommendation);

-- ─── EDITORIAL DECISIONS ────────────────────────────────────

CREATE TABLE editorial_decisions (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  article_id      UUID NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
  editor_id       UUID NOT NULL REFERENCES users(id),
  decision        article_status NOT NULL,
  round           INTEGER NOT NULL DEFAULT 1,
  comments        TEXT,                              -- to author
  internal_notes  TEXT,                              -- editor only
  decided_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_decisions_article ON editorial_decisions(article_id);

-- ─── EDITORIAL BOARD ────────────────────────────────────────

CREATE TABLE editorial_board (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id           UUID NOT NULL REFERENCES users(id),
  role              VARCHAR(100) NOT NULL,           -- Editor-in-Chief, etc.
  specializations   TEXT[],
  start_date        DATE NOT NULL DEFAULT CURRENT_DATE,
  end_date          DATE,
  is_active         BOOLEAN NOT NULL DEFAULT TRUE,
  display_order     INTEGER NOT NULL DEFAULT 99,
  bio               TEXT,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_board_user ON editorial_board(user_id);
CREATE INDEX idx_board_active ON editorial_board(is_active);

-- ─── ANNOUNCEMENTS ──────────────────────────────────────────

CREATE TABLE announcements (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title           VARCHAR(500) NOT NULL,
  slug            VARCHAR(300) UNIQUE NOT NULL,
  content         TEXT NOT NULL,
  type            announcement_type NOT NULL DEFAULT 'general',
  is_important    BOOLEAN NOT NULL DEFAULT FALSE,
  is_published    BOOLEAN NOT NULL DEFAULT FALSE,
  published_at    TIMESTAMPTZ,
  expires_at      TIMESTAMPTZ,
  author_id       UUID REFERENCES users(id),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_announcements_published ON announcements(is_published, published_at);

-- ─── ARTICLE FILES ───────────────────────────────────────────

CREATE TABLE article_files (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  article_id  UUID NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
  file_type   VARCHAR(50) NOT NULL,                  -- manuscript, figure, table, supplement
  file_name   VARCHAR(500) NOT NULL,
  file_url    TEXT NOT NULL,                         -- Cloudflare R2 URL
  mime_type   VARCHAR(100),
  file_size   BIGINT,                                -- bytes
  version     INTEGER NOT NULL DEFAULT 1,
  is_current  BOOLEAN NOT NULL DEFAULT TRUE,
  uploaded_by UUID REFERENCES users(id),
  uploaded_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_files_article ON article_files(article_id);

-- ─── ARTICLE METRICS ─────────────────────────────────────────

CREATE TABLE article_metrics (
  id          BIGSERIAL PRIMARY KEY,
  article_id  UUID NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
  event_type  VARCHAR(50) NOT NULL,                  -- view, download, share
  ip_hash     VARCHAR(64),                           -- hashed for privacy
  country     VARCHAR(5),
  user_agent  TEXT,
  referrer    TEXT,
  created_at  DATE NOT NULL DEFAULT CURRENT_DATE
);

CREATE INDEX idx_metrics_article ON article_metrics(article_id);
CREATE INDEX idx_metrics_date ON article_metrics(created_at);

-- ─── SAVED / BOOKMARKS ──────────────────────────────────────

CREATE TABLE saved_articles (
  user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  article_id  UUID NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
  saved_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (user_id, article_id)
);

-- ─── SESSIONS (NextAuth) ─────────────────────────────────────

CREATE TABLE sessions (
  id              VARCHAR(255) PRIMARY KEY,
  user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  session_token   VARCHAR(255) UNIQUE NOT NULL,
  expires         TIMESTAMPTZ NOT NULL
);

CREATE TABLE verification_tokens (
  identifier  VARCHAR(255) NOT NULL,
  token       VARCHAR(255) UNIQUE NOT NULL,
  expires     TIMESTAMPTZ NOT NULL,
  PRIMARY KEY (identifier, token)
);

-- ─── UPDATE TRIGGERS ─────────────────────────────────────────

CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_users_updated
  BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_articles_updated
  BEFORE UPDATE ON articles FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_reviews_updated
  BEFORE UPDATE ON reviews FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ─── SEED: initial data ──────────────────────────────────────

INSERT INTO volumes (number, year) VALUES (1, 2026);

INSERT INTO issues (volume_id, number, month, year, is_current, published_at)
VALUES (1, 1, 'March', 2026, TRUE, '2026-03-15');

-- ─── VIEWS ───────────────────────────────────────────────────

CREATE VIEW published_articles AS
SELECT
  a.*,
  i.number AS issue_number,
  i.month AS issue_month,
  v.number AS volume_number,
  v.year AS volume_year,
  ARRAY_AGG(
    JSON_BUILD_OBJECT(
      'name', aa.first_name || ' ' || aa.last_name,
      'affiliation', aa.affiliation,
      'country', aa.country,
      'is_corresponding', aa.is_corresponding,
      'orcid', aa.orcid
    ) ORDER BY aa.author_order
  ) AS authors_json
FROM articles a
JOIN issues i ON a.issue_id = i.id
JOIN volumes v ON i.volume_id = v.id
LEFT JOIN article_authors aa ON a.id = aa.article_id
WHERE a.status = 'published'
GROUP BY a.id, i.number, i.month, v.number, v.year;

COMMENT ON TABLE articles IS 'Core article records for JERA';
COMMENT ON TABLE users IS 'All registered users: authors, reviewers, editors, admins';
COMMENT ON TABLE reviews IS 'Peer review records (double-blind)';
COMMENT ON TABLE editorial_board IS 'Journal editorial board members';
