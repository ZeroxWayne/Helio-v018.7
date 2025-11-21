import React, { useState, useMemo } from 'react';
import { Calendar, X, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { IconToggle } from '@/components/ui/icon-toggle';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface InlineDateFilterProps {
  isActive: boolean;
  selectedDate: string;
  onToggle: (checked: boolean) => void;
  onSelect: (date: string) => void;
}

const InlineDateFilter: React.FC<InlineDateFilterProps> = ({
  isActive,
  selectedDate,
  onToggle,
  onSelect
}) => {
  const [open, setOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  const datePresets = [
    'Today',
    'Tomorrow',
    '1 day',
    '2 days',
    '3 days',
    '1 week',
    '2 weeks',
    '1 month',
  ];

  const filteredPresets = useMemo(() => {
    if (!searchInput.trim()) return datePresets;
    const search = searchInput.toLowerCase();
    return datePresets.filter(preset => 
      preset.toLowerCase().includes(search)
    );
  }, [searchInput]);

  const handleToggle = (checked: boolean) => {
    onToggle(checked);
    if (!checked) {
      setOpen(false);
    }
  };

  const togglePreset = (preset: string) => {
    if (selectedDate === preset) {
      onSelect('');
    } else {
      onSelect(preset);
    }
    setOpen(false);
  };

  const clearAll = () => {
    onSelect('');
    setOpen(false);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-gray-300 text-sm">Date</span>
        <IconToggle
          icon={Calendar}
          checked={isActive}
          onCheckedChange={handleToggle}
        />
      </div>

      {isActive && (
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal bg-[#252525] border-[#414141] text-gray-300 hover:bg-[#2a2a2a] hover:text-white rounded-[8px] h-9"
            >
              <Calendar className="mr-2 h-4 w-4" />
              {selectedDate || 'Select date'}
            </Button>
          </PopoverTrigger>
          <PopoverContent 
            className="w-[240px] p-0 bg-[#1a1a1a] border-[#414141]" 
            align="start"
          >
            <div className="p-3 space-y-2">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search date presets..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="pl-8 bg-[#252525] border-[#414141] text-white placeholder:text-gray-500 h-9 rounded-[8px]"
                />
              </div>

              <div className="space-y-1 max-h-48 overflow-y-auto">
                {filteredPresets.map((preset) => (
                  <Button
                    key={preset}
                    onClick={() => togglePreset(preset)}
                    variant="ghost"
                    className={`w-full justify-start text-left h-9 rounded-[8px] ${
                      selectedDate === preset
                        ? 'bg-white text-black hover:bg-white/90'
                        : 'text-gray-300 hover:bg-[#252525]'
                    }`}
                  >
                    {preset}
                  </Button>
                ))}
              </div>

              {selectedDate && (
                <Button
                  onClick={clearAll}
                  variant="ghost"
                  size="sm"
                  className="w-full text-gray-400 hover:text-red-400 hover:bg-red-500/10 border border-[#414141] rounded-[8px] text-xs"
                >
                  <X className="h-3 w-3 mr-1" />
                  Clear
                </Button>
              )}
            </div>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
};

export default InlineDateFilter;
