export type SpinnerTypes = {
    size: string | number;
    color: string;
    unit: string;
    duration: string;
    pause: boolean;
};
export type Circle2Types = {
    colorOuter: string;
    colorCenter: string;
    colorInner: string;
    durationMultiplier: number;
    durationOuter: string;
    durationInner: string;
    durationCenter: string;
} & SpinnerTypes;