import { getThemeStyles } from '@/components/Theme';
import { useThemeStore } from "@/stores/theme-store";
import { useExerciseStore } from '@/stores/useExerciseStore';
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Alert, FlatList, Text, TouchableOpacity, View } from "react-native";

export default function Exercises() {
  const { theme } = useThemeStore();
  const isDark = theme === "dark";
  const {loadExercises, exercises, deleteExercise}= useExerciseStore()
  const styles = getThemeStyles(isDark)
  const router = useRouter()
  useEffect( () => {
    const fetchExercises = async()=>{
      await loadExercises()
    }
    fetchExercises()
  }, [])
  
  const eliminateExercise=(id :number)=>{
     Alert.alert("Avisi", "Deseas borra el ejercisio?",[
      {text:"Cancelar", style:"cancel"},
      {text:"Aceptar", onPress:()=> deleteExercise(id)}
     ])
  }

  console.log(exercises)

  return (
    <View
      className={`flex-1 px-4 py-6 ${
        isDark ? "bg-dark-background" : "bg-background"
      }`}
    >
      <Text
        className={`text-2xl font-bold mb-6 ${
          isDark ? "text-dark-foreground" : "text-foreground"
        }`}
      >
      Actividades 
      </Text>
      <FlatList 
       data={exercises}
       keyExtractor={(exe)=>exe.id?.toString()}
       renderItem={({item})=>{
        
        return(
          <View  className={`${styles.card} mt-2 px-2 py-5  flex-row items-center justify-between`} >
           <View>
           <Text className={`${styles.text} `}>
              {item.type}
            </Text>
            <View className="flex-row">
            <Text className={`${styles.textMuted} mt-1 `}>
             Intensidad {item.intensity}
            </Text>
            </View>
            <Text className={`${styles.textMuted} mt-1`}>
             Duración {item.duration} min.
            </Text>
           </View>
           <View className="flex-row">
           <TouchableOpacity  className="mr-2" onPress={()=>router.push({pathname:"/health/exercises/add", params:{exerciseId:item.id}})} >
             <Ionicons name="pencil-sharp" size={24} color="#0F5AC4" />
           </TouchableOpacity>
            
           <TouchableOpacity onPress={()=>eliminateExercise(item.id)} >
             <Ionicons name="trash" size={24} color="red" />
           </TouchableOpacity>
           </View>
          </View>
        )
       }}
       ListEmptyComponent={()=>(
        <View className="flex-1 items-center justify-center">
          <Text className={`${styles.text} text-2xl `}>No hay ejercicios registrados aun</Text>
        </View>
       )}
      />
    </View>
  );
}
