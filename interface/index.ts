export interface LayoutProps {
    children: React.ReactNode;
}

export interface TimeCardProps {
    time: number;
    setTime: (time: number) => void;
    selected?: boolean;
}

export interface TIMES {
    [key:number]: number;
}

export interface AppState {
    time: number;
    words: string;
    wordLength: number;
    setTime: (time: number) => void;
    setWords: (words: string) => void;
    setWordLength: (wordLength: number) => void;
}