// import { useLoaderStore } from "@/stores/loaderStorage";

// import { MotiView } from "moti";
// import React from "react";
// import { StyleSheet } from "react-native";
// import { MotiLoader } from "./MotiLoader";


// export function LoaderOverlay() {
//   const visible = useLoaderStore((s) => s.visible);

//   if (!visible) return null;

//   return (
//     <MotiView from={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
//       <MotiLoader />
//     </MotiView>
//   );
// }


// const styles = StyleSheet.create({
//   overlay: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     alignItems: "center",
//     justifyContent: "center",
//     zIndex: 9999,
//   },
// });
