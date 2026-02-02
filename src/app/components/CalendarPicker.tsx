import React from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale"; // Importamos español
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "./ui/utils";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover"; // Necesitas el componente Popover

interface CalendarPickerProps {
  value: Date | undefined; // Nota: shadcn prefiere undefined sobre null
  onChange: (date: Date | undefined) => void;
}

const CalendarPicker: React.FC<CalendarPickerProps> = ({ value, onChange }) => {
  return (
    <Popover>
      {/* 1. El Disparador (El botón) */}
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[190px] justify-start text-left font-normal",
            !value && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? (
            // Formateamos la fecha nosotros mismos con date-fns
            format(value, "d 'de' MMMM, yyyy", { locale: es })
          ) : (
            <span>Elige una fecha</span>
          )}
        </Button>
      </PopoverTrigger>

      {/* 2. El Contenido (El Calendario) */}
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
          initialFocus
          // Esto asegura que el calendario se vea en español
          locale={es} 
        />
      </PopoverContent>
    </Popover>
  );
};

export default CalendarPicker;