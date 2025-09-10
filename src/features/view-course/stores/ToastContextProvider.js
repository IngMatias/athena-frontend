'use client'

import React, { useContext, useCallback, useMemo, useState } from "react";
import { ToastViewport } from "../components/organisms/toastViewport/toastViewport";

export const ToastContext = React.createContext({});

export function useToast() {
    const ctx = useContext(ToastContext);
    if (!ctx) throw new Error("useToast must be used within <ToastContextProvider>");
    return ctx;
}

export function ToastContextProvider({ children }) {
    const [toasts, setToasts] = useState([]);

    const remove = useCallback((id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    const toast = useCallback(({
        variant = "info", // info | success | warning | error
        title = "",
        message,
        duration = 4000,
        dismissible = true,
        actionLabel,
        onAction,
    }) => {
        const id = `${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

        setToasts((prev) => {
            return [
                { id, message, title, variant, duration, dismissible, actionLabel, onAction },
                ...prev];
        });

        if (duration > 0) {
            setTimeout(() => remove(id), duration);
            return () => clearTimeout(timer);
        }


        return id; // allow manual removal if needed
    }, [remove]);

    const value = useMemo(() => ({ toast, remove }), [toast, remove]);

    return (
        <ToastContext.Provider value={value}
        >
            {children}
            <ToastViewport toasts={toasts} onClose={remove} />
        </ToastContext.Provider>
    );
}