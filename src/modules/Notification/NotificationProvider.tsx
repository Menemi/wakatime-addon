import React, {createContext, useContext, useState, ReactNode} from 'react';
import Notification from './Notification';

type ShowNotificationProps = {
    message: string,
    type: 'info' | 'success' | 'warning' | 'error',
    title?: string,
    hasAcceptBtn?: true,
    onCloseMs?: number,
}

type NotificationContextType = {
    showNotification: (notify: ShowNotificationProps) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({children}) => {
    const [notification, setNotification] = useState<ShowNotificationProps | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    const showNotification = (notify: ShowNotificationProps) => {
        setNotification(notify);
        setIsVisible(true);

        setTimeout(() => {
            setIsVisible(false);
        }, notify.onCloseMs || 3000);
    };

    return (
        <NotificationContext.Provider value={{showNotification}}>
            {children}
            <Notification
                title={notification?.title}
                message={notification?.message || ''}
                type={notification?.type || 'info'}
                hasAcceptBtn={notification?.hasAcceptBtn}
                isVisible={isVisible}
                onClose={() => setIsVisible(false)}
            />
        </NotificationContext.Provider>
    );
};

export const useNotification = (): NotificationContextType => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotification must be used within a NotificationProvider');
    }
    return context;
};
