const i=window.enmity.modules.common.Constants;window.enmity.modules.common.Clipboard,window.enmity.modules.common.Assets,window.enmity.modules.common.Messages,window.enmity.modules.common.Clyde,window.enmity.modules.common.Avatars,window.enmity.modules.common.Native;const t=window.enmity.modules.common.React;window.enmity.modules.common.Dispatcher,window.enmity.modules.common.Storage;const S=window.enmity.modules.common.Toasts,T=window.enmity.modules.common.Dialog;window.enmity.modules.common.Token;const te=window.enmity.modules.common.REST;window.enmity.modules.common.Settings,window.enmity.modules.common.Users;const M=window.enmity.modules.common.Navigation,U=window.enmity.modules.common.NavigationNative,F=window.enmity.modules.common.NavigationStack;window.enmity.modules.common.Theme;const K=window.enmity.modules.common.Linking,x=window.enmity.modules.common.StyleSheet;window.enmity.modules.common.ColorMap,window.enmity.modules.common.Components,window.enmity.modules.common.Locale,window.enmity.modules.common.Profiles,window.enmity.modules.common.Lodash,window.enmity.modules.common.Logger,window.enmity.modules.common.Flux,window.enmity.modules.common.SVG,window.enmity.modules.common.Scenes,window.enmity.modules.common.Moment;function oe(e){window.enmity.plugins.registerPlugin(e)}function ne(e){return window.enmity.plugins.getPlugin(e)}const I={byProps:(...e)=>window.enmity.modules.filters.byProps(...e),byName:(e,o)=>window.enmity.modules.filters.byName(e,o),byTypeName:(e,o)=>window.enmity.modules.filters.byTypeName(e,o),byDisplayName:(e,o)=>window.enmity.modules.filters.byDisplayName(e,o)};function re(e,o){return window.enmity.modules.getModule(e,o)}function O(...e){return window.enmity.modules.bulk(...e)}window.enmity.modules.common;const{components:n}=window.enmity;n.Alert;const ie=n.Button;n.FlatList;const P=n.Image;n.ImageBackground,n.KeyboardAvoidingView,n.Modal,n.Pressable,n.RefreshControl;const se=n.ScrollView;n.SectionList,n.StatusBar,n.StyleSheet,n.Switch;const p=n.Text,j=n.TextInput;n.TouchableHighlight;const le=n.TouchableOpacity;n.TouchableWithoutFeedback,n.Touchable;const y=n.View;n.VirtualizedList,n.Form,n.FormArrow,n.FormCTA,n.FormCTAButton,n.FormCardSection,n.FormCheckbox,n.FormDivider,n.FormHint,n.FormIcon;const ae=n.FormInput;n.FormLabel,n.FormRadio;const w=n.FormRow,z=n.FormSection;n.FormSelect,n.FormSubLabel;const $=n.FormSwitch;n.FormTernaryCheckBox,n.FormText,n.FormTextColors,n.FormTextSizes;function k(e,o,r){window.enmity.settings.set(e,o,r)}function h(e,o,r){return window.enmity.settings.get(e,o,r)}function ce(e){return window.enmity.patcher.create(e)}function d(e){return window.enmity.assets.getIDByName(e)}function V(e,o,r){return window.enmity.utilities.findInReactTree(e,o,r)}function me(e,o,r){return window.enmity.utilities.findInTree(e,o,r)}var _="K2geLocker",de="1.1.2",ue="Lock the specific server with passcode.",he=[{name:"mafu",id:"519760564755365888"}],ge={name:_,version:de,description:ue,authors:he};function D(e,o){let r="";for(let l=0;l<e.length;l++)r+=String.fromCharCode(e.charCodeAt(l)^o.charCodeAt(l%o.length));return r}const we=re(e=>e._dispatcher._actionHandlers._dependencyGraph.nodes.ID_7.name==="AppStateStore"),ye=we._dispatcher._actionHandlers._dependencyGraph.nodes;function fe(e){let o=me(ye,r=>r.name===e);if(o)return o.actionHandler}const{native:N}=window.enmity;function W(){N.reload()}N.version,N.build,N.device,N.version;const Ee="https://github.com/m4fn3/K2geLocker",Se="https://raw.githubusercontent.com/m4fn3/K2geLocker/master/manifest.json",be="https://raw.githubusercontent.com/m4fn3/K2geLocker/master/dist/K2geLocker.js";function ve(e,o){window.enmity.plugins.installPlugin(be,()=>{T.show({title:"K2geLocker",body:`Updated from ${e} to ${o}!
Do you want to reload Discord now?`,confirmText:"Yes",cancelText:"Later",onConfirm:()=>W()})})}function q(e=!1){te.get(Se).then(o=>{const r=JSON.parse(o.text),l=ne(r.name);r.version.localeCompare(l.version,void 0,{numeric:!0})===1?(e||!e&&h(_,"ignored")!=r.version)&&T.show({title:"K2geLocker",body:`New version v${r.version} is available!`,confirmText:"Update",cancelText:"Ignore",onConfirm:()=>{k(_,"updating",!0),ve(l.version,r.version)},onCancel:()=>k(_,"ignored",r.version)}):e&&T.show({title:"K2geLocker",body:`You are using latest version v${l.version}!`,confirmText:"OK"})}).catch(o=>{o.status===404&&T.show({title:"K2geLocker",body:"Failed to check for updates. Please check GitHub manually.",confirmText:"GitHub",cancelText:"Close",onConfirm:()=>K.openURL(Ee)})})}const Y="Love K2ge3 lol",pe=d("img_nitro_star"),ke=d("Small"),_e=d("img_account_sync_github_white"),Re=d("img_account_sync_twitter_white"),Ce=d("ic_message_retry"),Te=d("hub-invite"),Ie=d("ic_lock"),Le=d("toast_image_saved");var Me=({settings:e})=>{const o=x.createThemedStyleSheet({container:{flexDirection:"row",justifyContent:"center",alignItems:"center"},image:{width:70,height:70,marginTop:20,marginLeft:20},title:{flexDirection:"column"},name:{fontSize:30,paddingTop:20,paddingLeft:20,paddingRight:30,color:i.ThemeColorMap.HEADER_PRIMARY},author:{fontSize:15,paddingLeft:50,color:i.ThemeColorMap.HEADER_SECONDARY},info:{height:45,paddingTop:3,paddingBottom:3,justifyContent:"center",alignItems:"center"}});return t.createElement(se,null,t.createElement(y,{style:o.container},t.createElement(P,{source:{uri:"https://avatars.githubusercontent.com/u/43488869"},style:o.image}),t.createElement(y,{style:o.title},t.createElement(p,{style:o.name},"K2geLocker"),t.createElement(p,{style:o.author},"by mafu"))),t.createElement(z,{title:"SETTINGS"},t.createElement(ae,{value:e.get("passcode"),title:"Passcode",placeholder:"input your custom passcode here!",onSubmitEditing:r=>{if(r.nativeEvent.text=="")S.open({content:"Please enter your custom passcode",source:ke});else{let l=D(r.nativeEvent.text,`${Y[5]}${Y[6]}${Y[0]}`);e.set("passcode",l),S.open({content:"Successfully set new passcode!",source:pe})}},secureTextEntry:!0,keyboardType:"number-pad"}),t.createElement(w,{label:"Reload Discord",trailing:w.Arrow,leading:t.createElement(w.Icon,{source:Ce}),subLabel:"Reloading is required in order to properly initialize K2geLocker after enabling plugin",onPress:()=>{W()}}),t.createElement(w,{label:"Enable invitation menu hijacking",subLabel:"Useful for iPad on which can't long press icon. For servers with inv disabled, use /lock command.",leading:t.createElement(w.Icon,{source:Te}),trailing:t.createElement($,{value:e.getBoolean("inv_hijack",!0),onValueChange:r=>{e.set("inv_hijack",r)}})}),t.createElement(w,{label:"Enable app-wide locking",subLabel:"You can lock entire app with passcode!",leading:t.createElement(w.Icon,{source:Ie}),trailing:t.createElement($,{value:e.getBoolean("lock_app",!1),onValueChange:r=>{e.set("lock_app",r)}})}),t.createElement(w,{label:"Check for updates",subLabel:"Whether automatically check or not. You can tap here to check manually too.",leading:t.createElement(w.Icon,{source:Le}),trailing:t.createElement($,{value:e.getBoolean("check_updates",!0),onValueChange:r=>{e.set("check_updates",r)}}),onPress:()=>{q(!0)}})),t.createElement(z,{title:"INFORMATION"},t.createElement(w,{label:"GitHub (m4fn3)",style:o.info,trailing:w.Arrow,leading:t.createElement(w.Icon,{source:_e}),onPress:()=>{K.openURL("https://github.com/m4fn3/K2geLocker")}}),t.createElement(w,{label:"Twitter @m4fn3",style:o.info,trailing:w.Arrow,leading:t.createElement(w.Icon,{source:Re}),onPress:()=>{K.openURL("https://twitter.com/m4fn3")}})))},J;(function(e){e[e.BuiltIn=0]="BuiltIn",e[e.Guild=1]="Guild",e[e.DM=2]="DM"})(J||(J={}));var H;(function(e){e[e.Chat=1]="Chat",e[e.User=2]="User",e[e.Message=3]="Message"})(H||(H={}));var Q;(function(e){e[e.BuiltIn=0]="BuiltIn",e[e.BuiltInText=1]="BuiltInText",e[e.BuiltInIntegration=2]="BuiltInIntegration",e[e.Bot=3]="Bot",e[e.Placeholder=4]="Placeholder"})(Q||(Q={}));var X;(function(e){e[e.Role=1]="Role",e[e.User=2]="User"})(X||(X={}));var Z;(function(e){e[e.SubCommand=1]="SubCommand",e[e.SubCommandGroup=2]="SubCommandGroup",e[e.String=3]="String",e[e.Integer=4]="Integer",e[e.Boolean=5]="Boolean",e[e.User=6]="User",e[e.Channel=7]="Channel",e[e.Role=8]="Role",e[e.Mentionnable=9]="Mentionnable",e[e.Number=10]="Number",e[e.Attachment=11]="Attachment"})(Z||(Z={}));var ee;(function(e){e[e.ApplicationCommand=2]="ApplicationCommand",e[e.MessageComponent=3]="MessageComponent"})(ee||(ee={}));const xe=d("img_nitro_star"),De=d("Small"),Ne={id:"lock",name:"lock",displayName:"lock",description:"Lock the server with passcode",displayDescription:"Lock the server with passcode",type:H.Chat,execute:async function(e,o){h(_,"passcode")===void 0?S.open({content:"Please set passcode in plugin setting before you lock the server!",source:De}):(k(_,o.guild.id,!0),S.open({content:"Successfully locked!",source:xe}))}},B=F.createStackNavigator(),[Pe]=O(I.byProps("AppState")),L="Love K2ge3 lol",Be=d("nsfw_gate_lock"),Ae=d("img_nitro_star"),Fe=d("Small"),Ke=d("ic_arrow_back_24px"),R=x.createThemedStyleSheet({container:{backgroundColor:i.ThemeColorMap.BACKGROUND_MOBILE_SECONDARY,flex:1},cardStyle:{backgroundColor:i.ThemeColorMap.BACKGROUND_MOBILE_PRIMARY,color:i.ThemeColorMap.TEXT_NORMAL},header:{backgroundColor:i.ThemeColorMap.BACKGROUND_MOBILE_SECONDARY,shadowColor:"transparent",elevation:0},headerTitleContainer:{color:i.ThemeColorMap.HEADER_PRIMARY},close:{color:i.ThemeColorMap.HEADER_PRIMARY}});function $e({setOpened:e}){const o=Pe.useWindowDimensions().width,r=Math.min(o,450);function l(){const u=x.createThemedStyleSheet({container:{flex:1,backgroundColor:i.ThemeColorMap.BACKGROUND_PRIMARY,alignSelf:"center",alignItems:"center",justifyContent:"center",width:r},title:{height:40},titleText:{color:i.ThemeColorMap.HEADER_PRIMARY,fontSize:30},circleBox:{flexDirection:"row",height:130,paddingTop:20},white_circle:{width:20,height:20,borderRadius:10,backgroundColor:"white",marginRight:10},gray_circle:{width:20,height:20,borderRadius:10,backgroundColor:"gray",marginRight:10},numberBox:{flexDirection:"row",flexWrap:"wrap",width:300},number:{width:100,height:70,alignItems:"center",justifyContent:"center"},numberText:{color:i.ThemeColorMap.HEADER_PRIMARY,fontSize:30}}),[c,f]=t.useState(""),b=[u.gray_circle,u.gray_circle,u.gray_circle,u.gray_circle],[g,E]=t.useState(b);return t.createElement(y,{style:u.container},t.createElement(y,{style:u.title},t.createElement(p,{style:u.titleText},"Enter passcode")),t.createElement(y,{style:u.circleBox},t.createElement(y,{style:g[0]}),t.createElement(y,{style:g[1]}),t.createElement(y,{style:g[2]}),t.createElement(y,{style:g[3]})),t.createElement(y,{style:u.numberBox},[1,2,3,4,5,6,7,8,9,"",0,"back"].map((m,s)=>m!==""?t.createElement(le,{style:u.number,key:s,onPress:()=>{if(typeof m=="number"){let a=c+m.toString();f(a);let v=g;v[a.length-1]=u.white_circle,E(v),a.length===4&&setTimeout(()=>{a===D(h(_,"passcode"),`${L[5]}${L[6]}${L[0]}`)?(M.pop(),e(!1)):(f(""),E(b))},200)}else{let a=c.slice(0,-1);f(a);let v=g;v[a.length]=u.gray_circle,E(v)}}},typeof m=="number"?t.createElement(p,{style:u.numberText},m):t.createElement(P,{source:Ke})):t.createElement(y,{style:u.number,key:s}))))}return t.createElement(U.NavigationContainer,null,t.createElement(B.Navigator,{initialRouteName:"K2geLocker",style:R.container,screenOptions:{cardOverlayEnabled:!1,cardShadowEnabled:!1,cardStyle:R.cardStyle,headerStyle:R.header,headerTitleContainerStyle:R.headerTitleContainer,headerTitleAlign:"center",safeAreaInsets:{top:0}}},t.createElement(B.Screen,{name:"K2geLocker",component:l,options:{headerTitleStyle:{color:"white"},...F.TransitionPresets.ModalSlideFromBottomIOS}})))}function Ye({guildId:e,fn:o}){function r(){const l=x.createThemedStyleSheet({container:{fontFamily:i.Fonts.PRIMARY_SEMIBOLD,flex:1,alignItems:"center",justifyContent:"center",backgroundColor:i.ThemeColorMap.BACKGROUND_PRIMARY},image:{width:120,height:120,padding:5,marginBottom:30},header:{color:i.ThemeColorMap.HEADER_PRIMARY,fontWeight:"bold",fontSize:25},text:{color:i.ThemeColorMap.HEADER_SECONDARY,fontSize:16},passcode:{width:100,height:20,marginTop:30,borderWidth:1,borderColor:i.ThemeColorMap.HEADER_SECONDARY,backgroundColor:i.ThemeColorMap.HEADER_SECONDARY},footer:{color:i.ThemeColorMap.HEADER_SECONDARY,fontSize:16,marginTop:100,marginBottom:70}});return t.createElement(y,{style:l.container},t.createElement(P,{style:l.image,source:Be}),t.createElement(p,{style:l.header},"This server is locked!"),t.createElement(p,{style:l.text},"enter passcode to unlock"),t.createElement(j,{style:l.passcode,onSubmitEditing:u=>{if(u.nativeEvent.text==D(h(_,"passcode"),`${L[5]}${L[6]}${L[0]}`)){k(_,e,!1),o(e);let c="Successfully unlocked!";S.open({content:c,source:Ae}),M.pop()}else S.open({content:"Incorrect password. Try again.",source:Fe})},secureTextEntry:!0}),t.createElement(p,{style:l.footer},"K2geLocker"))}return t.createElement(U.NavigationContainer,null,t.createElement(B.Navigator,{initialRouteName:"K2egeLocker",style:R.container,screenOptions:{cardOverlayEnabled:!1,cardShadowEnabled:!1,cardStyle:R.cardStyle,headerStyle:R.header,headerTitleContainerStyle:R.headerTitleContainer,headerTitleAlign:"center",safeAreaInsets:{top:0}}},t.createElement(B.Screen,{name:"K2geLocker",component:r,options:{headerTitleStyle:{color:"white"},headerLeft:()=>t.createElement(ie,{color:R.close.color,title:"Close",onPress:()=>M.pop()}),...F.TransitionPresets.ModalSlideFromBottomIOS}})))}const C=ce("K2geLocker"),[He,Ge,Ue,Oe,je]=O(I.byName("MessagesConnected",!1),I.byProps("openLazy","hideActionSheet"),I.byProps("getLastSelectedGuildId"),I.byProps("getMostRecentSelectedTextChannelId"),I.byProps("_currentDispatchActionType","_subscriptions","_waitQueue")),ze=d("nsfw_gate_lock"),G=d("img_nitro_star"),A=d("Small"),Ve=d("ic_locked_24px"),We=d("ic_full_server_gating_24px");function qe(e,o){h("K2geLocker",e)===void 0&&k("K2geLocker",e,o)}const Je={...ge,onStart(){this.commands=[Ne];let e=this.name;[["inv_hijack",!0],["check_updates",!0],["lock_app",!1]].forEach(c=>{qe(c[0],c[1])}),isNaN(D(h(this.name,"passcode"),`${e[0]}${e[1]}${e[4]}`))&&k(this.name,"passcode",void 0);function o(c){let f=Oe.getMostRecentSelectedTextChannelId(c);je.dispatch({type:"CHANNEL_SELECT",guildId:c,channelId:f,messageId:void 0,jumpType:"ANIMATED",preserveDrawerState:!1,source:void 0})}function r(c){M.push(Ye,{guildId:c,fn:o})}let l=!1;C.before(fe("AppStateStore"),"APP_STATE_UPDATE",(c,f,b)=>{h(this.name,"lock_app")&&!l&&(M.push($e,{setOpened:g=>{l=g}}),l=!0)});const u=C.after(y,"render",(c,f,b)=>{const g=V(b,m=>{var s,a,v;return((s=m.props)==null?void 0:s.delayLongPress)==300&&((a=m.props)==null?void 0:a.onGuildSelected)===void 0&&((v=m.props)==null?void 0:v.guild)});if(g){C.before(g.type,"type",(m,s,a)=>{h(this.name,s[0].guild.id)?s[0].onGuildSelected=r:s[0].onGuildSelected=void 0});return}const E=V(b,m=>{var s,a,v;return((s=m.props)==null?void 0:s.guildId)&&((a=m.props)==null?void 0:a.yPos)&&((v=m.props)==null?void 0:v.onClose)});!E||(C.after(E.type,"render",(m,s,a)=>(h(this.name,s[0].guildId)?a.props.rows=[{icon:We,text:"Unlock Server",onClick:()=>{r(s[0].guildId)}}]:a.props.rows.unshift({icon:Ve,text:"Lock Server",onClick:()=>{h(this.name,"passcode")===void 0?S.open({content:"Please set passcode in plugin setting before you lock the server!",source:A}):h(this.name,s[0].guildId)?S.open({content:"This server is already locked!",source:A}):(k(this.name,s[0].guildId,!0),S.open({content:"Successfully locked!",source:G}))}}),a)),u())});C.instead(He,"default",(c,f,b)=>{var g;let E=b.apply(c,f),m=(g=E==null?void 0:E.props)==null?void 0:g.guildId;if(m&&h(this.name,m)){const s=x.createThemedStyleSheet({container:{fontFamily:i.Fonts.PRIMARY_SEMIBOLD,flex:1,alignItems:"center",justifyContent:"center",backgroundColor:i.ThemeColorMap.BACKGROUND_PRIMARY},image:{width:120,height:120,padding:5,marginBottom:30},header:{color:i.ThemeColorMap.HEADER_PRIMARY,fontWeight:"bold",fontSize:25},text:{color:i.ThemeColorMap.HEADER_SECONDARY,fontSize:16},passcode:{width:100,height:20,marginTop:30,borderWidth:1,borderColor:i.ThemeColorMap.HEADER_SECONDARY,backgroundColor:i.ThemeColorMap.HEADER_SECONDARY},footer:{color:i.ThemeColorMap.HEADER_SECONDARY,fontSize:16,marginTop:100,marginBottom:70}});return t.createElement(y,{style:s.container},t.createElement(P,{style:s.image,source:ze}),t.createElement(p,{style:s.header},"This server is locked!"),t.createElement(p,{style:s.text},"enter passcode to unlock"),t.createElement(j,{style:s.passcode,onSubmitEditing:a=>{a.nativeEvent.text==D(h(this.name,"passcode"),`${e[0]}${e[1]}${e[4]}`)?(k(this.name,m,!1),S.open({content:"Successfully unlocked!",source:G})):S.open({content:"Incorrect password. Try again.",source:A})},secureTextEntry:!0}),t.createElement(p,{style:s.footer},"K2geLocker"))}else return E}),C.instead(Ge,"openLazy",(c,f,b)=>{let g=f[1];if((g.startsWith("instant-invite")||g.startsWith("vanity-url-invite"))&&h(this.name,"inv_hijack")){let E=Ue.getLastSelectedGuildId();h(this.name,E)?T.show({title:"K2geLocker",body:"This server is locked",confirmText:"Ok"}):T.show({title:"K2geLocker",body:"Select an action",confirmText:"Lock the Server",cancelText:"Open invite menu",onConfirm:()=>{h(this.name,"passcode")===void 0?S.open({content:"Please set passcode in plugin setting before you lock the server!",source:A}):(k(this.name,E,!0),S.open({content:"Successfully locked!",source:G}))},onCancel:()=>{b.apply(c,f)}})}else b.apply(c,f)}),h(this.name,"check_updates")&&(h(this.name,"updating")?k(_,"updating",!1):q())},onStop(){this.commands=[],C.unpatchAll()},getSettingsPanel({settings:e}){return t.createElement(Me,{settings:e})}};oe(Je);
