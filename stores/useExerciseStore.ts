import { getDB } from "@/libs/database";
import { create } from "zustand";

export interface ExerciseEntry {
  id?: number;
  type: string;
  duration: number; // minutos
  intensity: string;
  date: string; // ISO string
}

interface ExerciseState {
  exercises: ExerciseEntry[];
  loadExercises: () => Promise<void>;
  addExercise: (entry: ExerciseEntry) => Promise<void>;
  deleteExercise:(id:number)=> Promise<void>;
  upDateExercise:( id:number, type: string, duration:number, intensity:string)=> Promise<void>
}

export const useExerciseStore = create<ExerciseState>((set) => ({
  exercises: [],

  loadExercises: async () => {
    const db = getDB();
    if (!db) return;

    // 👉 TIPAR EL RESULTADO AQUÍ
    const rows = await db.getAllAsync<ExerciseEntry>(
      "SELECT * FROM exercises ORDER BY created_at DESC"
    );

    set({ exercises: rows });
  },

  addExercise: async (entry) => {
    const db = getDB();
    if (!db) return;

    await db.runAsync(
      "INSERT INTO exercises (type, duration, intensity, created_at) VALUES (?, ?, ?, ?)",
      [entry.type, entry.duration, entry.intensity, entry.date]
    );

    // Recargar
    const rows = await db.getAllAsync<ExerciseEntry>(
      "SELECT * FROM exercises ORDER BY created_at DESC"
    );

    set({ exercises: rows });
  },

  deleteExercise: async (id) => {
    const db = getDB();
    if (!db) return;

    await db.runAsync(
      "DELETE FROM exercises WHERE id =?",[id]
    );

    const rows = await db.getAllAsync<ExerciseEntry>(
      "SELECT * FROM exercises ORDER BY created_at DESC"
    );

    set({ exercises: rows });
  },
  upDateExercise: async(id, type,duration, intensity)=>{
    const db = getDB();
    await db.runSync("UPDATE exercises SET type = ?, duration =?, intensity=? WHERE id =?",[type, duration, intensity, id])
    const rows = await db.getAllAsync<ExerciseEntry>(
      "SELECT * FROM exercises ORDER BY created_at DESC"
    );

    set({ exercises: rows });
  }
}));
