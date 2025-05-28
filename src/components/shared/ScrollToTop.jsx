import { useEffect } from "react";
import { useLocation, matchPath } from "react-router-dom";

export function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        const match = matchPath("/games/details/:gameId", pathname);

        if (match) {
            window.scrollTo(0, 0);
        }
    }, [pathname]);

    return null;
}
