import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatTimestamp = (timestamp: string, timeZone: string = "America/Bogota") => {
  try {
   
    // Normalizar el formato de entrada (soporta espacio o 'T' como separador)
    const normalizedTimestamp = timestamp.includes(' ') ? 
      timestamp.replace(' ', 'T') + (timestamp.includes('Z') ? '' : 'Z') : 
      timestamp;
    
    // Crear fecha en UTC
    const date = new Date(normalizedTimestamp);
    
    // Validación de fecha
    if (isNaN(date.getTime())) {
      throw new Error('Fecha inválida');
    }

  
    // Obtener fecha actual en la zona horaria especificada
    const now = new Date();
    const nowInTZ = new Date(now.toLocaleString('en-US', { timeZone }));
    
    // Calcular diferencia en minutos
    const diffInMilliseconds = nowInTZ.getTime() - date.getTime();
    const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
    

    // Resto de tu lógica de formateo...
    if (diffInMilliseconds < 0) {
      const options: Intl.DateTimeFormatOptions = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZone
      };
      return `el ${date.toLocaleDateString('es-ES', options)}`;
    }

    if (diffInMinutes < 1) return 'hace un momento';
    if (diffInMinutes < 60) return `hace ${diffInMinutes} ${diffInMinutes === 1 ? 'minuto' : 'minutos'}`;
    
    // ... (continuar con el resto de tu lógica)
    
  } catch (error) {
    console.error('Error al formatear fecha:', error);
    return 'Fecha inválida';
  }
};