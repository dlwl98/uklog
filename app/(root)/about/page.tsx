import { Metadata } from 'next';
import stylex from '@stylexjs/stylex';
import { flex } from '@/app/(root)/global.stylex';
import ProfileAccordion from './_components/ProfileAccordion';

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
        <ProfileAccordion title="Self Introduction">
          <p {...stylex.props(styles.bioText)}>
            단순한 UI 구현을 넘어, 웹 브라우저의 한계 성능을 끌어내고 복잡한
            실시간 동시성 문제를 해결하는 데 몰입하는 프론트엔드 엔지니어입니다.
            그래픽 에디터와 같은 고난도 애플리케이션을 개발하며 네트워크,
            렌더링, 아키텍처 전반에서 사용자 경험을 저해하는 병목을 집요하게
            찾아 해결해 왔습니다.
          </p>

          <div {...stylex.props(styles.bioGroup)}>
            <h3 {...stylex.props(styles.bioSubtitle)}>
              1. 실시간 협업 시스템의 안정성 확보
            </h3>
            <p {...stylex.props(styles.bioText)}>
              여러 사용자가 동시에 디자인을 편집하는 환경에서 발생하는 데이터
              정합성과 연결 불안정 문제를 해결한 경험이 있습니다.
            </p>
            <ul {...stylex.props(styles.bioList)}>
              <li {...stylex.props(styles.bioListItem)}>
                <span {...stylex.props(styles.bioBold)}>
                  RSocket 재연결 전략 수립
                </span>
                : 네트워크 단절 시 작업 내용이 유실되는 문제를 해결하기 위해,
                단순 재연결이 아닌 ReliableRequest와 Operation 개념을
                도입했습니다. Command(변경 요청)만을 선별적으로 재전송하고,
                응답의 완결성을 추적하여 데이터 정합성을 보장했습니다.
              </li>
              <li {...stylex.props(styles.bioListItem)}>
                <span {...stylex.props(styles.bioBold)}>
                  Thundering Herd 방지
                </span>
                : 다수의 클라이언트가 동시 재연결 시 서버에 가해지는 부하를
                분산시키기 위해 Exponential Backoff와 Jitter 알고리즘을 적용하여
                시스템 안정성을 높였습니다.
              </li>
              <li {...stylex.props(styles.bioListItem)}>
                <span {...stylex.props(styles.bioBold)}>
                  Reactive Stream 제어
                </span>
                : RxJS를 도입하여 비동기로 발생하는 수많은 이벤트를 스트림으로
                관리하고, 복잡한 썸네일 생성 로직 등을 선언적으로 간결하게
                처리했습니다.
              </li>
            </ul>
          </div>

          <div {...stylex.props(styles.bioGroup)}>
            <h3 {...stylex.props(styles.bioSubtitle)}>
              2. 브라우저 렌더링 성능의 극한 추구
            </h3>
            <p {...stylex.props(styles.bioText)}>
              React의 추상화 비용조차 병목이 되는 고성능 요구사항 환경에서,
              브라우저 내부 동작 원리를 응용하여 극적인 성능 개선을
              이뤄냈습니다.
            </p>
            <ul {...stylex.props(styles.bioList)}>
              <li {...stylex.props(styles.bioListItem)}>
                <span {...stylex.props(styles.bioBold)}>
                  DOM 조작 최적화 (INP 83.8% 개선)
                </span>
                : 수십 개의 반복되는 요소를 렌더링할 때 React 마운트 비용이
                병목임을 파악하고, cloneNode API를 활용해 DOM 자체를 복제하는
                기법을 도입했습니다. 이를 통해 INP(Interaction to Next Paint)를
                1832ms에서 296ms로 단축시키는(CPU 쓰로틀 환경) 성과를
                거두었습니다.
              </li>
              <li {...stylex.props(styles.bioListItem)}>
                <span {...stylex.props(styles.bioBold)}>
                  Main Thread 블로킹 해소
                </span>
                : 대용량 오디오 파형 계산 시 UI가 프리징되는 현상을 해결하기
                위해 Web Worker를 도입, 무거운 연산 작업을 백그라운드 스레드로
                격리하여 끊김 없는 사용자 경험을 제공했습니다.
              </li>
              <li {...stylex.props(styles.bioListItem)}>
                <span {...stylex.props(styles.bioBold)}>리렌더링 최소화</span>:
                useSyncExternalStore와 Proxy API를 적극 활용하여, 전역 상태나
                윈도우 리사이즈 이벤트 등 빈번한 상태 변화가 필요한 곳만
                정밀하게 리렌더링되도록 아키텍처를 개선했습니다.
              </li>
            </ul>
          </div>

          <div {...stylex.props(styles.bioGroup)}>
            <h3 {...stylex.props(styles.bioSubtitle)}>
              3. 유지보수 가능한 아키텍처 설계
            </h3>
            <p {...stylex.props(styles.bioText)}>
              복잡도가 높은 애플리케이션에서 기능 격리와 확장성을 고려한 설계를
              지향합니다.
            </p>
            <ul {...stylex.props(styles.bioList)}>
              <li {...stylex.props(styles.bioListItem)}>
                <span {...stylex.props(styles.bioBold)}>GA 시스템 개선</span>:
                전역 변수로 관리되던 복잡한 로직을 React Context API 기반의
                격리된 시스템으로 재설계하여, 사이드 이펙트와 리렌더링이
                &quot;0&quot;인 구조를 만들었습니다.
              </li>
              <li {...stylex.props(styles.bioListItem)}>
                <span {...stylex.props(styles.bioBold)}>
                  확장 가능한 UI 구조
                </span>
                : 기존 단일 패널 구조를 스택(Stack) 형태의 뷰로 개선, 또한 Proxy
                기반 프로퍼티 사용여부 추적을 통한 동적 subscribe 시스템을 통해
                사용자 UX를 개선함과 동시에 성능을 높였습니다.
              </li>
            </ul>
          </div>
        </ProfileAccordion>
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
  bioGroup: {
    marginTop: '24px',
  },
  bioSubtitle: {
    fontSize: '1rem',
    fontWeight: 700,
    color: '#374151',
    marginTop: '0',
    marginRight: '0',
    marginBottom: '8px',
    marginLeft: '0',
  },
  bioText: {
    fontSize: '0.95rem',
    color: '#4b5563',
    marginTop: '0',
    marginRight: '0',
    marginBottom: '8px',
    marginLeft: '0',
    lineHeight: 1.6,
  },
  bioList: {
    marginTop: '0',
    marginRight: '0',
    marginBottom: '0',
    marginLeft: '0',
    paddingLeft: '20px',
    listStyleType: 'disc',
  },
  bioListItem: {
    fontSize: '0.95rem',
    color: '#4b5563',
    marginBottom: '6px',
    lineHeight: 1.6,
  },
  bioBold: {
    fontWeight: 600,
    color: '#374151',
  },
});
