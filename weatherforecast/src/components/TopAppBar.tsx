import { SearchDialog } from "@/components/SearchDialog";
import { Logo } from "@/assets/logo";
import { ThemeDropDown } from "@/components/ThemeDropDown";
import { UnitDropdown } from "@/components/UnitDropdown";

export const TopAppBar = () => {
  return (
    <div className="h-16 lg:my-4">
      {/* Fixed header with blur effect, becomes a floating card on large screens */}
      <header className="h-16 px-4 flex items-center gap-5 justify-between fixed top-0 left-0 w-full bg-background/50 backdrop-blur-lg border-b z-50 lg:border lg:rounded-2xl lg:w-auto lg:max-w-384 lg:mx-auto lg:top-4 lg:left-4 lg:right-4">
        <Logo />
        <SearchDialog />
        <div className="flex gap-2">
          <ThemeDropDown />
          <UnitDropdown />
        </div>
      </header>
    </div>
  );
};