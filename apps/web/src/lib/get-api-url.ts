export const getApiUrl = (path: string): string => {
    const cleanPath = path.startsWith('/') ? path : `/${path}`;

    if (import.meta.env.DEV) {
        return cleanPath;
    }

    const apiBaseUrl = import.meta.env.VITE_API_URL;

    if (apiBaseUrl) {
        const pathWithoutApi = cleanPath.replace(/^\/api/, '');
        return `${apiBaseUrl}${pathWithoutApi}`;
    }

    return cleanPath;
}
