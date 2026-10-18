import { Icon } from '@/components/ui/Icon';
import { badges, recognitions } from '@/content/profile';
import styles from './Achievements.module.css';

/** Seção "Conquistas": badges de certificações e programas + reconhecimentos PRAD. */
export function Achievements() {
  return (
    <section className={styles.section} aria-labelledby="conquistas">
      <div className={styles.header}>
        <h2 id="conquistas" className={styles.title}>
          Conquistas
        </h2>
        <p className={styles.summary}>Certificações, programas e reconhecimentos ao longo do caminho.</p>
      </div>

      <div className={styles.groups}>
        <section className={styles.group} aria-labelledby="certificacoes">
          <h3 id="certificacoes" className={styles.groupTitle}>
            <Icon name="star" size={20} />
            Certificações e badges
          </h3>
          <ul className={styles.badges}>
            {badges.map((badge) => {
              const content = (
                <>
                  <img src={badge.image} alt="" loading="lazy" className={styles.badgeImage} />
                  <strong>{badge.title}</strong>
                  <span>
                    {badge.issuer}
                    {badge.date && ` · ${badge.date}`}
                  </span>
                  {badge.url && (
                    <span className={styles.verify}>
                      Ver credencial <Icon name="external" size={12} />
                    </span>
                  )}
                </>
              );
              return (
                <li key={badge.title}>
                  {badge.url ? (
                    <a
                      href={badge.url}
                      target="_blank"
                      rel="noreferrer"
                      className={styles.badge}
                      aria-label={`${badge.title}: ver credencial no Credly (abre em nova aba)`}
                    >
                      {content}
                    </a>
                  ) : (
                    <div className={styles.badge}>{content}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </section>

        <section className={styles.group} aria-labelledby="reconhecimentos">
          <h3 id="reconhecimentos" className={styles.groupTitle}>
            <Icon name="heart" size={20} />
            Reconhecimentos
          </h3>
          <ul className={styles.recognitions}>
            {recognitions.map((item) => (
              <li key={item.date} className={styles.recognition}>
                <span className={styles.medal} aria-hidden="true">
                  <span className={styles.medalLabel}>PRAD</span>
                  <span className={styles.medalYear}>{item.year}</span>
                </span>
                <span className={styles.recognitionText}>
                  <strong>{item.title}</strong>
                  <span>
                    {item.issuer} · {item.date}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </section>
  );
}
