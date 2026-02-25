"use client";

import {
	type CSSProperties,
	type ReactNode,
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
} from "react";

type TabItem<T extends string = string> = {
	label: ReactNode;
	value: T;
	content?: ReactNode; // Make content optional since we might just use tabs for navigation
};

type FloatingTabsProps<T extends string = string> = {
	tabs: TabItem<T>[];
	defaultValue?: T;
	value?: T; // controlled mode
	onChange?: (value: T) => void;
	className?: string;
};

export function FloatingTabs<T extends string = string>({
	tabs,
	defaultValue,
	value,
	onChange,
	className = "",
}: FloatingTabsProps<T>) {
	const isControlled = value !== undefined;

	const [internalValue, setInternalValue] = useState<T>(
		defaultValue ?? tabs[0]?.value
	);

	const activeTab = isControlled ? value! : internalValue;

	const containerRef = useRef<HTMLDivElement | null>(null);

	const [indicatorStyle, setIndicatorStyle] = useState<CSSProperties>({
		opacity: 0,
	});

	const updateIndicator = () => {
		if (!(containerRef.current && activeTab)) {
			return;
		}

		const activeButton = containerRef.current.querySelector<HTMLButtonElement>(
			`[data-value="${activeTab}"]`
		);

		if (!activeButton) {
			return;
		}

		const { offsetLeft, offsetWidth } = activeButton;

		setIndicatorStyle({
			left: offsetLeft,
			width: offsetWidth,
			opacity: 1,
		});
	};

	useLayoutEffect(() => {
		updateIndicator();
	}, [activeTab]);

	// 🔥 Fix resize issue
	useEffect(() => {
		window.addEventListener("resize", updateIndicator);
		return () => window.removeEventListener("resize", updateIndicator);
	}, [activeTab]);

	const handleTabChange = (val: T) => {
		if (!isControlled) {
			setInternalValue(val);
		}
		onChange?.(val);
	};

	const activeContent = tabs.find((tab) => tab.value === activeTab)?.content;

	return (
		<div className={className}>
			<div
				className="relative flex w-fit items-center gap-1 rounded-full border-2 border-white bg-white/80 p-1 shadow-[-1px_3px_7px_rgba(0,0,0,0.10)] backdrop-blur-[10px] lg:p-1.5"
				ref={containerRef}
				role="tablist"
			>
				<div
					className="absolute h-[calc(100%-8px)] rounded-[36px] border border-[#013BDB] shadow-[-1px_1px_3px_rgba(1,59,219,0.40),_-2px_2px_3px_rgba(1,32,60,0.34)] transition-all duration-300 ease-out before:absolute before:inset-0 before:rounded-[36px] before:shadow-[0_1px_9px_2px_rgba(210,234,255,0.30)_inset] lg:h-[calc(100%-12px)]"
					style={{
						...indicatorStyle,
						background: `
      linear-gradient(180deg, #013BDB 0%, #2C62F7 100%)
    `,
					}}
				/>

				{tabs.map((tab) => {
					const isActive = tab.value === activeTab;

					return (
						<button
							aria-selected={isActive}
							className={`relative z-10 flex items-center gap-2 rounded-full px-4 py-1.5 font-medium text-sm transition-colors duration-200 lg:py-2 ${
								isActive
									? "text-white"
									: "text-[hsla(217,21%,65%,1)] hover:text-slate-600"
							}`}
							data-value={tab.value}
							key={tab.value}
							onClick={() => handleTabChange(tab.value)}
							role="tab"
						>
							{tab.label}
						</button>
					);
				})}
			</div>

			{activeContent && (
				<div className="fade-in-0 mt-4 animate-in duration-200" role="tabpanel">
					{activeContent}
				</div>
			)}
		</div>
	);
}
