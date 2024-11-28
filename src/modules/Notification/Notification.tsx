import styles from './Notification.module.css';

import React from 'react';
import { cn } from '../../helpers';

type NotificationProps = {
    message: string;
    type: 'info' | 'success' | 'warning' | 'error';
    isVisible: boolean;
    title?: string;
    hasAcceptBtn?: true;
    onClose?: () => void;
};

const Notification: React.FC<NotificationProps> = ({ title, message, type, hasAcceptBtn, isVisible, onClose }) => {
    const style: {
        color: string;
        icon: JSX.Element;
    } =
        type === 'success'
            ? {
                  color: styles.success,
                  icon: <i className="bx bxs-check-circle bx-sm" style={{ color: 'var(--success-text)' }} />,
              }
            : type === 'warning'
              ? {
                    color: styles.warning,
                    icon: <i className="bx bxs-error bx-sm" style={{ color: 'var(--warning-text)' }} />,
                }
              : type === 'error'
                ? {
                      color: styles.error,
                      icon: <i className="bx bxs-error-circle bx-sm" style={{ color: 'var(--error-text)' }} />,
                  }
                : {
                      color: styles.info,
                      icon: <i className="bx bxs-info-circle bx-sm" style={{ color: 'var(--info-text)' }} />,
                  };

    return (
        <div className={cn([styles.containerBackground, isVisible && styles.visible])}>
            <div className={cn([styles.container, style.color])}>
                <div className={styles.containerBackground}></div>
                <>{style.icon}</>
                <div className={styles.textContainer}>
                    {title && <p className={styles.title}>{title}</p>}
                    <p className={styles.message}>{message}</p>
                    {hasAcceptBtn && (
                        <button onClick={onClose} className={styles.acceptBtn}>
                            Принять
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Notification;
