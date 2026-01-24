import { Metadata } from 'next';
import stylex from '@stylexjs/stylex';
import { flex } from '@/app/(root)/global.stylex';

export const metadata: Metadata = {
  title: `about`,
};

export default function Page() {
  return (
    <main {...stylex.props(styles.container)}>
      <header {...stylex.props(styles.header)}>
        <div {...stylex.props(styles.headerContent)}>
          <h1 {...stylex.props(styles.name)}>이진욱</h1>
          <p {...stylex.props(styles.title)}>Frontend Developer</p>
        </div>
        <div {...stylex.props(styles.headerAccent)} />
      </header>

      <section {...stylex.props(styles.section)}>
        <h2 {...stylex.props(styles.sectionTitle)}>Contact</h2>
        <div {...stylex.props(styles.contactGrid)}>
          <a
            href="mailto:ff981113@naver.com"
            {...stylex.props(styles.contactItem)}
          >
            <span {...stylex.props(styles.contactLabel)}>Email</span>
            <span {...stylex.props(styles.contactValue)}>
              ff981113@naver.com
            </span>
          </a>
          <a
            href="https://github.com/dlwl98"
            target="_blank"
            rel="noopener noreferrer"
            {...stylex.props(styles.contactItem)}
          >
            <span {...stylex.props(styles.contactLabel)}>GitHub</span>
            <span {...stylex.props(styles.contactValue)}>
              github.com/dlwl98
            </span>
          </a>
          <a
            href="https://www.linkedin.com/in/%EC%9D%B4%EC%A7%84%EC%9A%B1-57727a29b/"
            target="_blank"
            rel="noopener noreferrer"
            {...stylex.props(styles.contactItem)}
          >
            <span {...stylex.props(styles.contactLabel)}>LinkedIn</span>
            <span {...stylex.props(styles.contactValue)}>이진욱</span>
          </a>
        </div>
      </section>

      <section {...stylex.props(styles.section)}>
        <h2 {...stylex.props(styles.sectionTitle)}>Skills</h2>
        <div {...stylex.props(styles.skillsContainer)}>
          <span {...stylex.props(styles.skillTag)}>TypeScript</span>
          <span {...stylex.props(styles.skillTag)}>React</span>
          <span {...stylex.props(styles.skillTag)}>Next.js</span>
          <span {...stylex.props(styles.skillTag)}>RxJS</span>
        </div>
      </section>

      <section {...stylex.props(styles.section)}>
        <h2 {...stylex.props(styles.sectionTitle)}>Experience</h2>
        <div {...stylex.props(styles.experienceCard)}>
          <div {...stylex.props(styles.experienceHeader)}>
            <div {...stylex.props(flex.column, styles.experienceInfo)}>
              <h3 {...stylex.props(styles.companyName)}>미리디</h3>
              <a
                href="https://www.miricanvas.com"
                target="_blank"
                rel="noopener noreferrer"
                {...stylex.props(styles.serviceLink)}
              >
                미리캔버스 miricanvas.com
              </a>
            </div>
            <span {...stylex.props(styles.position)}>Frontend Developer</span>
          </div>
          <div {...stylex.props(styles.experienceTimeline)}>
            <div {...stylex.props(styles.timelineItem)}>
              <div {...stylex.props(styles.timelineDot)} />
              <div {...stylex.props(styles.timelineContent)}>
                <span {...stylex.props(styles.timelinePeriod)}>
                  2024.06 ~ 현재
                </span>
                <span {...stylex.props(styles.timelineRole)}>
                  정규직 · Engine Chapter
                </span>
              </div>
            </div>
            <div {...stylex.props(styles.timelineItem)}>
              <div
                {...stylex.props(
                  styles.timelineDot,
                  styles.timelineDotSecondary,
                )}
              />
              <div {...stylex.props(styles.timelineContent)}>
                <span {...stylex.props(styles.timelinePeriod)}>
                  2024.03 ~ 2024.06
                </span>
                <span {...stylex.props(styles.timelineRole)}>인턴</span>
              </div>
            </div>
          </div>
          <p {...stylex.props(styles.workDescription)}>
            미리캔버스 엔진 및 웹 개발
          </p>
        </div>
      </section>

      <section {...stylex.props(styles.section)}>
        <h2 {...stylex.props(styles.sectionTitle)}>Education</h2>
        <div {...stylex.props(styles.educationList)}>
          <div {...stylex.props(styles.educationItem)}>
            <div {...stylex.props(styles.educationMain)}>
              <h3 {...stylex.props(styles.educationName)}>
                프로그래머스 프론트엔드 데브코스
              </h3>
              <span {...stylex.props(styles.educationPeriod)}>
                2023년 하반기
              </span>
            </div>
            <span {...stylex.props(styles.educationStatus)}>수료</span>
          </div>
        </div>
      </section>

      <section {...stylex.props(styles.section)}>
        <h2 {...stylex.props(styles.sectionTitle)}>Academic</h2>
        <div {...stylex.props(styles.educationList)}>
          <div {...stylex.props(styles.educationItem)}>
            <div {...stylex.props(styles.educationMain)}>
              <h3 {...stylex.props(styles.educationName)}>한양대학교</h3>
              <span {...stylex.props(styles.educationPeriod)}>2018 입학</span>
            </div>
            <div {...stylex.props(flex.column, styles.academicDetails)}>
              <span {...stylex.props(styles.educationDepartment)}>
                컴퓨터소프트웨어학부
              </span>
              <span {...stylex.props(styles.educationStatus)}>재학중</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

const styles = stylex.create({
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '24px',
    paddingTop: '16px',
  },
  header: {
    position: 'relative',
    marginBottom: '48px',
    paddingBottom: '32px',
    paddingTop: '16px',
    paddingLeft: '24px',
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: '#e5e7eb',
  },
  headerContent: {
    position: 'relative',
    zIndex: 1,
  },
  headerAccent: {
    position: 'absolute',
    top: '8px',
    left: '0',
    width: '64px',
    height: '64px',
    backgroundColor: '#F3B95F',
    opacity: 0.15,
    borderRadius: '50%',
    zIndex: 0,
  },
  name: {
    fontSize: '2.5rem',
    fontWeight: 700,
    color: '#374151',
    margin: 0,
    marginBottom: '8px',
  },
  title: {
    fontSize: '1.25rem',
    color: '#6b7280',
    margin: 0,
    fontWeight: 500,
  },
  section: {
    marginBottom: '40px',
  },
  sectionTitle: {
    fontSize: '0.85rem',
    fontWeight: 600,
    color: '#F3B95F',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    marginBottom: '20px',
    margin: 0,
    paddingBottom: '8px',
    borderBottomWidth: '2px',
    borderBottomStyle: 'solid',
    borderBottomColor: '#F3B95F',
    display: 'inline-block',
  },
  contactGrid: {
    display: 'grid',
    gridTemplateColumns: {
      default: 'repeat(3, 1fr)',
      '@media (max-width: 600px)': '1fr',
    },
    gap: '16px',
    marginTop: '16px',
  },
  contactItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    padding: '16px',
    backgroundColor: '#fafafa',
    borderRadius: '8px',
    textDecoration: 'none',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: {
      default: '#e5e7eb',
      ':hover': '#F3B95F',
    },
    transition: 'border-color 0.2s ease, transform 0.2s ease',
    transform: {
      default: 'translateY(0)',
      ':hover': 'translateY(-2px)',
    },
  },
  contactLabel: {
    fontSize: '0.8rem',
    color: '#6b7280',
    fontWeight: 500,
  },
  contactValue: {
    fontSize: '0.95rem',
    color: '#374151',
    fontWeight: 500,
  },
  skillsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '12px',
    marginTop: '16px',
  },
  skillTag: {
    padding: '10px 20px',
    backgroundColor: 'white',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: '#e5e7eb',
    borderRadius: '24px',
    fontSize: '0.95rem',
    color: '#374151',
    fontWeight: 500,
    transition: 'all 0.2s ease',
  },
  experienceCard: {
    marginTop: '16px',
    padding: '24px',
    backgroundColor: 'white',
    borderRadius: '8px',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: '#e5e7eb',
  },
  experienceHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '20px',
    flexWrap: 'wrap',
    gap: '12px',
  },
  experienceInfo: {
    gap: '4px',
    alignItems: 'flex-start',
  },
  companyName: {
    fontSize: '1.25rem',
    fontWeight: 600,
    color: '#374151',
    margin: 0,
  },
  serviceLink: {
    fontSize: '0.85rem',
    color: '#F3B95F',
    textDecoration: 'none',
    fontWeight: 500,
  },
  position: {
    fontSize: '0.9rem',
    color: 'white',
    backgroundColor: '#F3B95F',
    padding: '6px 14px',
    borderRadius: '4px',
    fontWeight: 500,
  },
  experienceTimeline: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginBottom: '16px',
    paddingLeft: '8px',
  },
  timelineItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  timelineDot: {
    width: '10px',
    height: '10px',
    backgroundColor: '#F3B95F',
    borderRadius: '50%',
    flexShrink: 0,
  },
  timelineDotSecondary: {
    backgroundColor: '#e5e7eb',
  },
  timelineContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    flexWrap: 'wrap',
  },
  timelinePeriod: {
    fontSize: '0.9rem',
    color: '#374151',
    fontWeight: 500,
  },
  timelineRole: {
    fontSize: '0.85rem',
    color: '#6b7280',
  },
  workDescription: {
    fontSize: '0.95rem',
    color: '#6b7280',
    margin: 0,
    paddingTop: '16px',
    borderTopWidth: '1px',
    borderTopStyle: 'solid',
    borderTopColor: '#e5e7eb',
  },
  educationList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    marginTop: '16px',
  },
  educationItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 24px',
    backgroundColor: '#fafafa',
    borderRadius: '8px',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: '#e5e7eb',
    flexWrap: 'wrap',
    gap: '12px',
  },
  educationMain: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    flexWrap: 'wrap',
  },
  educationName: {
    fontSize: '1rem',
    fontWeight: 600,
    color: '#374151',
    margin: 0,
  },
  educationPeriod: {
    fontSize: '0.85rem',
    color: '#6b7280',
  },
  educationDepartment: {
    fontSize: '0.9rem',
    color: '#374151',
  },
  educationStatus: {
    fontSize: '0.85rem',
    color: '#F3B95F',
    fontWeight: 600,
  },
  academicDetails: {
    alignItems: 'flex-end',
    gap: '4px',
  },
});
