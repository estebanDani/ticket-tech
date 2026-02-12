import { useState, useEffect } from "react";
import { User } from "@/types";
import { AuthService } from "@/services/auth.service";

export const useClients = () => {
    const [clients, setClients] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchClients = async () => {
            try {
                setLoading(true);
                const clients = await AuthService.getAllUsers();
                setClients(clients);
            } catch (error) {
                setError(error as Error);
            } finally {
                setLoading(false);
            }
        };
        fetchClients();
    }, []);

    return { clients, loading, error };
}