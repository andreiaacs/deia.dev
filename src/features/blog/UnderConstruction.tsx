import { Link } from 'react-router';
import { Icon } from '@/components/ui/Icon';
import { paths } from '@/lib/paths';
import styles from './UnderConstruction.module.css';

const PROGRESS = 80;

/** Aviso bem-humorado enquanto o blog não tem posts publicados. */
export function UnderConstruction() {
  return (
    <section className={styles.scene} aria-labelledby="em-construcao">
      <img
        src="/images/construcao-deia.webp"
        alt="Ilustração da Déia trabalhando no notebook, com a calopsita de capacete na cabeça e uma placa de página em construção"
        width={954}
        height={994}
        className={styles.art}
      />

      <div className={styles.text}>
        <h2 id="em-construcao" className={styles.title}>
          Em construção
        </h2>
        <p className={styles.body}>
          Estou preparando esta parte do site com muito carinho, ideias e café para deixar tudo
          incrível!
        </p>

        <div className={styles.progress}>
          <div
            className={styles.track}
            role="progressbar"
            aria-label="Progresso do blog"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={PROGRESS}
          >
            <div className={styles.fill} style={{ width: `${PROGRESS}%` }} />
          </div>
          <span aria-hidden="true">{PROGRESS}%</span>
        </div>

        <nav className={styles.note} aria-label="Outras páginas">
          <span className={styles.tape} aria-hidden="true" />
          <p>Enquanto isso, que tal explorar as outras páginas? ♡</p>
          <ul>
            <li>
              <Link to={paths.about()}>
                Sobre mim <Icon name="arrowRight" size={16} />
              </Link>
            </li>
            <li>
              <Link to={paths.aulas()}>
                Aulas <Icon name="arrowRight" size={16} />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </section>
  );
}
