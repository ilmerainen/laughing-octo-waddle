import {useCallback, useEffect, useState} from "react";

export default function useIsPageBottom(bottomOffset: number = 50): [boolean,
    (value: (((prevState: boolean) => boolean) | boolean)) => void] {
    const [isBottom, setIsBottom] = useState<boolean>(false);

    const handleScroll = useCallback(() => {
        const scrollTop = (document.documentElement
            && document.documentElement.scrollTop)
            || document.body.scrollTop;
        const scrollHeight = (document.documentElement
            && document.documentElement.scrollHeight)
            || document.body.scrollHeight;
        if (scrollTop + window.innerHeight + bottomOffset >= scrollHeight) {
            setIsBottom(true);
        }
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    });

    return [isBottom, setIsBottom];
}