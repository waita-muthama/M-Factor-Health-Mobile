import React from 'react';
import { Pressable, StyleSheet, Text, View, type ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS as C } from './theme';

export type IconName = React.ComponentProps<typeof Ionicons>['name'];
export function Icon({ name, size=22, color=C.ink }: {name:IconName,size?:number,color?:string}) {
  return <Ionicons name={name} size={size} color={color} />;
}
export function Body({ children, style }: {children:React.ReactNode,style?:object}) {
  return <Text style={[styles.body,style]}>{children}</Text>;
}
export function Heading({ children, size=23, style }: {children:React.ReactNode,size?:number,style?:object}) {
  return <Text style={[styles.heading,{fontSize:size},style]}>{children}</Text>;
}
export function Small({ children, style }: {children:React.ReactNode,style?:object}) {
  return <Text style={[styles.small,style]}>{children}</Text>;
}
export function Panel({children,style}:{children:React.ReactNode,style?:ViewStyle}) {
  return <View style={[styles.panel,style]}>{children}</View>;
}
export function Button({ title, icon, onPress, variant='primary', disabled=false, style }:{title:string,icon?:IconName,onPress:()=>void,variant?:'primary'|'dark'|'outline'|'subtle',disabled?:boolean,style?:ViewStyle}) {
  const kind=variant==='primary'?styles.btnPrimary:variant==='dark'?styles.btnDark:variant==='outline'?styles.btnOutline:styles.btnSubtle;
  const inverse=variant==='dark';
  return <Pressable accessibilityRole="button" disabled={disabled} onPress={onPress} style={({pressed})=>[styles.button,kind,style,disabled&&{opacity:.5},pressed&&{opacity:.82}]}>
    {icon&&<Icon name={icon} size={17} color={inverse?C.white:C.ink}/>}<Text style={[styles.btnText,inverse&&{color:C.white}]}>{title}</Text>
  </Pressable>;
}
export function RoundIcon({name,color=C.ink,bg=C.yellowPale,size=48}:{name:IconName,color?:string,bg?:string,size?:number}) {
  return <View style={{width:size,height:size,borderRadius:size/3,backgroundColor:bg,alignItems:'center',justifyContent:'center'}}><Icon name={name} size={size*.48} color={color}/></View>;
}
export function Badge({label,kind='yellow'}:{label:string,kind?:'yellow'|'green'|'red'|'blue'}) {
  const color=kind==='yellow'?C.yellowPale:kind==='green'?C.greenPale:kind==='red'?C.redPale:C.bluePale;
  const text=kind==='yellow'?C.ink:kind==='green'?C.green:kind==='red'?C.red:C.blue;
  return <View style={{backgroundColor:color,paddingHorizontal:10,paddingVertical:6,borderRadius:30,alignSelf:'flex-start'}}><Text style={{fontSize:11,fontWeight:'800',color:text}}>{label}</Text></View>;
}
export const styles = StyleSheet.create({
  body:{fontSize:14,lineHeight:21,color:C.secondary},
  heading:{fontSize:23,lineHeight:30,color:C.ink,fontWeight:'900',letterSpacing:-.5},
  small:{fontSize:12,color:C.muted,lineHeight:18},
  panel:{backgroundColor:C.white,borderRadius:22,padding:18,borderWidth:1,borderColor:C.border},
  button:{minHeight:48,paddingHorizontal:18,paddingVertical:12,borderRadius:15,flexDirection:'row',alignItems:'center',justifyContent:'center',gap:8},
  btnPrimary:{backgroundColor:C.yellow},
  btnDark:{backgroundColor:C.ink},
  btnOutline:{backgroundColor:C.white,borderColor:C.border,borderWidth:1},
  btnSubtle:{backgroundColor:C.yellowPale},
  btnText:{fontSize:13,fontWeight:'800',color:C.ink},
});
