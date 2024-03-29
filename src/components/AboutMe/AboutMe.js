import React from 'react';
import Octokit from '@octokit/rest';
import Card from '@material-ui/core/Card';
import styles from './AboutMe.module.css';

const  octokit = new  Octokit();

class AboutMe extends React.Component {
  state = {
    isLoadingUser: true,
    isLoadingRepositories: true,
    isErrorUser: false,
    isErrorRepositories: false,
    ErrorTextUser: '',
    User: [],
    repoList: [],
  };

  componentDidMount() {
    octokit.users.getByUsername({
      username: 'lunar616'
    })
    .then(({data}) => {
      this.setState({ 
        User: data,
        isLoadingUser: false,
      });
    })
    .catch(() => {
      this.setState({ 
        isLoadingUser: false,
        isErrorUser: true,
        ErrorTextUser: 'Не удалось вывести информацию о пользователе, попробуйте позже!'
      });
    });

    octokit.repos.listForUser({
      username: 'lunar616',
    }).then(({ data }) => {
      this.setState({
        repoList: data,
        isLoadingRepositories: false,
      });
    })
    .catch(() => {
      this.setState({ 
        isLoadingRepositories: false,
        isErrorRepositories: true,
      });
    });
  };
  
  render() {
    const { isLoadingUser, isLoadingRepositories, repoList, isErrorUser, isErrorRepositories, ErrorTextUser, User } = this.state;
  
    return (
      <section className={styles.section}>
        <Card className={styles.user}>
          { isLoadingUser ? <div className={styles.preloader}></div> :
              <div className={styles.user__wrapp}>
                { isErrorUser ? <div className={styles['user-error']}>{ErrorTextUser}</div> :
                  <div className={styles.info}>
                    <img className={styles.info__avatar} src={User.avatar_url} alt='avatar'></img>
                    <div className={styles.description}>
                      <p className={styles.description__login}>Никита Родионов</p>
                      <p className={styles.description__bio}>{User.bio}</p>
                      <a className={styles.description__mail} 
                        href='mailto: nikita.rodionov.dev@yandex.ru'>
                        <ion-icon name='mail' />
                        nikita.rodionov.dev@yandex.ru
                      </a>
                      <a className={styles.description__tg} 
                        href='tg://resolve?domain=lunar616'>
                        <ion-icon name='send' />
                        +7 (999) 850 24 52
                      </a>
                    </div>
                    <div className={styles.contacts}>
                      <a href='https://github.com/lunar616'
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        <ion-icon name='logo-github'></ion-icon>
                      </a>
                      <a href='https://vk.com/lunar616'
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        <ion-icon name='logo-vk'></ion-icon>
                      </a>
                      <a
                        href='https://www.linkedin.com/in/lunar616'
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        <ion-icon name='logo-linkedin'></ion-icon>
                      </a>
                    </div>
                  </div>
                }
              </div>
          }
        </Card>

        <Card className={styles.works}>
          { isLoadingRepositories ? <div className={styles.preloader}></div> :
            <div className={styles.works__wrapp}>
              <h1 className={styles.works__title}>Репозитории на github.com</h1>
              { isErrorRepositories ? 
                <div className={styles.error}>
                  <p className={styles.error__text}>Что-то пошло не так...</p>
                  <p className={styles.error__help}>Попробуйте загрузить ещё раз</p>
                </div> :
                <div className={styles.repositories}>
                  <div className={styles.list}>
                    {repoList.map(repo => (
                      <ul key={repo.id}>
                        <div className={styles.repository}>
                          <div className={styles['info-about-repository-wrapped']}>
                            <a 
                              href={repo.svn_url} 
                              className={styles['info-about-repository-wrapped__link']}
                              target='_blank'
                              rel='noopener noreferrer'
                            >
                              {repo.name}
                            </a>
                            <div className={styles['info-about-repository']}>
                              <div className={styles[`info-about-repository__${repo.language}-icon`.toLowerCase()]}></div>
                              <p className={styles['info-about-repository__language']}>{repo.language}</p>
                              <p className={styles['info-about-repository__star']}>{repo.stargazers_count}</p>
                              <p className={styles['info-about-repository__forks']}>{repo.forks}</p>
                              <p className={styles['info-about-repository__update']}>{repo.updated_at}</p>
                            </div>
                          </div>
                        </div>
                      </ul>
                    ))}
                  </div>
                </div>
              }
            </div>
          }
        </Card>
      </section>
    );
  };
};

export default AboutMe;