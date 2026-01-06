import { useEffect, useMemo, useRef, useState } from "react";

export default function SearchableList({ items, itemKeyFn, children }) {
    // const lastChange = useRef();
    // 1. Быстрое состояние (для инпута)
    const [searchTerm, setSearchTerm] = useState("");
    // 2. Медленное состояние (для фильтрации)
    const [debouncedTerm, setDebouncedTerm] = useState("");

    // Эффект "выносит" значение из быстрого в медленное с задержкой
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedTerm(searchTerm); // Вот тут мы "выводим" данные наружу
        }, 1000);
        return () => clearTimeout(handler);
    }, [searchTerm]);

    // 3. Вычисление (результат всегда синхронен с debouncedTerm)
    const searchResults = useMemo(() => {
        console.log("Фильтрация...")
        return items.filter(item =>
            JSON.stringify(item).toLowerCase().includes(debouncedTerm.toLowerCase()),
        );
    }, [debouncedTerm, items]);
    //***********************************************************************************************************************
    // const searchResults = items.filter(item => {
    //     return JSON.stringify(item).toLowerCase().includes(searchTerm.toLowerCase());
    // });

    // console.log("Результат поиска:", debouncedTerm);
    //
    // function handleChange(event) {
    //     if (lastChange.current) {
    //         clearTimeout(lastChange.current);
    //     }
    //     lastChange.current = setTimeout(() => {
    //         lastChange.current = null;
    //         setSearchTerm(event.target.value);
    //     }, 1000);
    // }
    function handleChange(event) {
        setSearchTerm(event.target.value);
    }
    return (
        <div className={"searchable-list"}>
            <input type="search" placeholder="Search" onChange={handleChange} />
            <ul>
                {searchResults.map((item, index) => {
                    return <li key={itemKeyFn(item)}>{children(item)}</li>;
                })}
            </ul>
        </div>
    );
}
