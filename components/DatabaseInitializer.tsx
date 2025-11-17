import { initDB } from '@/libs/database';
import { useSQLiteContext } from 'expo-sqlite';
import { useEffect } from 'react';

export default function DatabaseInitializer({ children }: { children: React.ReactNode }) {
  const db = useSQLiteContext();

  useEffect(() => {
    const setup = async () => {
      console.log('🔄 Inicializando base de datos...');
      await initDB();
      console.log('✅ Base de datos inicializada.');
    };
    setup();
  }, [db]);

  return <>{children}</>;
}
