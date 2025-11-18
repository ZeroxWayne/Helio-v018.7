import React, { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar, X } from 'lucide-react';
import { format } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

interface DateFilterPopoverProps {
  selectedDate: string;
  onSelect: (date: string) => void;
}

const DateFilterPopover: React.FC<DateFilterPopoverProps> = ({ selectedDate, onSelect }) => {
  const [open, setOpen] = useState(false);
  const [tempDate, setTempDate] = useState<Date | undefined>(
    selectedDate ? new Date(selectedDate) : undefined
  );

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      const dateString = format(date, "yyyy-MM-dd");
      setTempDate(date);
      onSelect(dateString);
      setOpen(false);
    }
  };

  const clearDate = () => {
    onSelect('');
    setTempDate(undefined);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "text-gray-400 hover:text-white hover:border hover:border-[#252232] hover:bg-[#1e1e1f] hover:rounded-[8px] px-3 py-1 h-8 whitespace-nowrap transition-all duration-200 border border-transparent",
            selectedDate && "text-white border-[#252232] bg-[#1e1e1f] rounded-[8px]"
          )}
        >
          <Calendar className="h-4 w-4 mr-2" />
          {selectedDate ? format(new Date(selectedDate), "MMM dd") : "Date"}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[300px] p-0 bg-[#1b1b1b] border border-[#414141] rounded-[12px] overflow-hidden flex flex-col"
        align="start"
        side="bottom"
        sideOffset={8}
        data-nested={true}
      >
        <div className="flex flex-col">
          <div className="p-3 flex-1 overflow-auto">
            <CalendarComponent
              mode="single"
              selected={tempDate}
              onSelect={handleDateSelect}
              className="rounded-[8px]"
            />
          </div>

          {selectedDate && (
            <div className="p-3 border-t border-[#414141]">
              <Button
                onClick={clearDate}
                variant="ghost"
                size="sm"
                className="w-full text-gray-400 hover:text-red-400 hover:bg-red-500/10 border border-[#414141] rounded-[8px] text-xs"
              >
                <X className="h-3 w-3 mr-1" />
                Clear
              </Button>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default DateFilterPopover;
