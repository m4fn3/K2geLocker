const w=window.enmity.modules.common.Constants;window.enmity.modules.common.Clipboard,window.enmity.modules.common.Assets,window.enmity.modules.common.Messages,window.enmity.modules.common.Clyde,window.enmity.modules.common.Avatars,window.enmity.modules.common.Native;const t=window.enmity.modules.common.React;window.enmity.modules.common.Dispatcher,window.enmity.modules.common.Storage;const S=window.enmity.modules.common.Toasts,R=window.enmity.modules.common.Dialog;window.enmity.modules.common.Token;const W=window.enmity.modules.common.REST;window.enmity.modules.common.Settings,window.enmity.modules.common.Users;const N=window.enmity.modules.common.Navigation,ge=window.enmity.modules.common.NavigationNative,J=window.enmity.modules.common.NavigationStack;window.enmity.modules.common.Theme;const G=window.enmity.modules.common.Linking,F=window.enmity.modules.common.StyleSheet;window.enmity.modules.common.ColorMap,window.enmity.modules.common.Components,window.enmity.modules.common.Locale,window.enmity.modules.common.Profiles,window.enmity.modules.common.Lodash,window.enmity.modules.common.Logger,window.enmity.modules.common.Flux,window.enmity.modules.common.SVG,window.enmity.modules.common.Scenes,window.enmity.modules.common.Moment;function he(e){window.enmity.plugins.registerPlugin(e)}function we(e){return window.enmity.plugins.getPlugin(e)}const x={byProps:(...e)=>window.enmity.modules.filters.byProps(...e),byName:(e,o)=>window.enmity.modules.filters.byName(e,o),byTypeName:(e,o)=>window.enmity.modules.filters.byTypeName(e,o),byDisplayName:(e,o)=>window.enmity.modules.filters.byDisplayName(e,o)};function ye(e,o){return window.enmity.modules.getModule(e,o)}function Q(...e){return window.enmity.modules.bulk(...e)}window.enmity.modules.common;const{components:n}=window.enmity;n.Alert;const X=n.Button;n.FlatList;const $=n.Image;n.ImageBackground,n.KeyboardAvoidingView,n.Modal,n.Pressable,n.RefreshControl;const fe=n.ScrollView;n.SectionList,n.StatusBar,n.StyleSheet,n.Switch;const T=n.Text;n.TextInput,n.TouchableHighlight;const Se=n.TouchableOpacity;n.TouchableWithoutFeedback,n.Touchable;const b=n.View;n.VirtualizedList,n.Form,n.FormArrow,n.FormCTA,n.FormCTAButton,n.FormCardSection,n.FormCheckbox,n.FormDivider,n.FormHint,n.FormIcon,n.FormInput,n.FormLabel,n.FormRadio;const d=n.FormRow,q=n.FormSection;n.FormSelect,n.FormSubLabel;const U=n.FormSwitch;n.FormTernaryCheckBox,n.FormText,n.FormTextColors,n.FormTextSizes;function E(e,o,r){window.enmity.settings.set(e,o,r)}function m(e,o,r){return window.enmity.settings.get(e,o,r)}function be(e){return window.enmity.patcher.create(e)}function l(e){return window.enmity.assets.getIDByName(e)}function Z(e,o,r){return window.enmity.utilities.findInReactTree(e,o,r)}var p="K2geLocker",ee="1.2.2",ve="Lock App / Server with passcode!",Ee=[{name:"mafu",id:"519760564755365888"}],_e={name:p,version:ee,description:ve,authors:Ee};function H(e,o){let r="";for(let v=0;v<e.length;v++)r+=String.fromCharCode(e.charCodeAt(v)^o.charCodeAt(v%o.length));return r}const pe=ye(e=>e._dispatcher._actionHandlers._dependencyGraph.nodes),Y=pe._dispatcher._actionHandlers._dependencyGraph.nodes;function K(e){let o=Object.keys(Y).filter(r=>Y[r].name===e);if(o)return Y[o[0]].actionHandler}const{native:A}=window.enmity;function te(){A.reload()}A.version,A.build,A.device,A.version;const ke="https://github.com/m4fn3/K2geLocker",Le="https://raw.githubusercontent.com/m4fn3/K2geLocker/master/manifest.json",Ce="https://raw.githubusercontent.com/m4fn3/K2geLocker/master/dist/K2geLocker.js",Ie="https://raw.githubusercontent.com/m4fn3/K2geLocker/master/changelogs.json";function Re(e,o){window.enmity.plugins.installPlugin(Ce,()=>{R.show({title:"K2geLocker",body:`Updated from ${e} to ${o}!
Do you want to reload Discord now?`,confirmText:"Yes",cancelText:"Later",onConfirm:()=>te()})})}function oe(e=!1){W.get(Le).then(o=>{const r=JSON.parse(o.text),v=we(r.name);r.version.localeCompare(v.version,void 0,{numeric:!0})===1?(e||!e&&m(p,"ignored")!=r.version)&&W.get(Ie).then(k=>{const L=JSON.parse(k.text);let a="";L[r.version]&&(a=`

- Changelogs
${L[r.version]}`),R.show({title:"K2geLocker",body:`New version v${r.version} is available!${a}`,confirmText:"Update",cancelText:"Ignore",onConfirm:()=>{E(p,"updating",!0),Re(v.version,r.version)},onCancel:()=>E(p,"ignored",r.version)})}):e&&R.show({title:"K2geLocker",body:`You are using latest version v${v.version}!`,confirmText:"OK"})}).catch(o=>{o.status===404&&R.show({title:"K2geLocker",body:"Failed to check for updates. Please check GitHub manually.",confirmText:"GitHub",cancelText:"Close",onConfirm:()=>G.openURL(ke)})})}const ne=J.createStackNavigator(),[Te]=Q(x.byProps("AppState")),P="Love K2ge3 lol";l("nsfw_gate_lock");const re=l("img_nitro_star");l("ic_following");const Me=l("ic_info_24px"),ie=l("Small"),Ne=l("ic_arrow_back_24px"),B=F.createThemedStyleSheet({container:{backgroundColor:w.ThemeColorMap.BACKGROUND_MOBILE_SECONDARY,flex:1},cardStyle:{backgroundColor:w.ThemeColorMap.BACKGROUND_MOBILE_PRIMARY,color:w.ThemeColorMap.TEXT_NORMAL},header:{backgroundColor:w.ThemeColorMap.BACKGROUND_MOBILE_SECONDARY,shadowColor:"transparent",elevation:0},headerTitleContainer:{color:w.ThemeColorMap.HEADER_PRIMARY},close:{color:w.ThemeColorMap.HEADER_PRIMARY}});function j({callback:e=null,isSetup:o=!1,showClose:r=!0}){const v=Te.useWindowDimensions().width,k=Math.min(v,450);function L(){const a=F.createThemedStyleSheet({container:{flex:1,backgroundColor:w.ThemeColorMap.BACKGROUND_PRIMARY,alignSelf:"center",alignItems:"center",justifyContent:"center",width:k},title:{height:40},titleText:{color:w.ThemeColorMap.HEADER_PRIMARY,fontSize:30},circleBox:{flexDirection:"row",height:130,paddingTop:20},white_circle:{width:20,height:20,borderRadius:10,backgroundColor:"white",marginRight:10},gray_circle:{width:20,height:20,borderRadius:10,backgroundColor:"gray",marginRight:10},numberBox:{flexDirection:"row",flexWrap:"wrap",width:300},number:{width:100,height:70,alignItems:"center",justifyContent:"center"},numberText:{color:w.ThemeColorMap.HEADER_PRIMARY,fontSize:30}}),[M,D]=t.useState(""),[O,C]=t.useState(""),s=[a.gray_circle,a.gray_circle,a.gray_circle,a.gray_circle],[c,u]=t.useState(s);let f=o?"Enter new passcode":"Enter passcode ";return t.createElement(b,{style:a.container},t.createElement(b,{style:a.title},t.createElement(T,{style:a.titleText},f)),t.createElement(b,{style:a.circleBox},t.createElement(b,{style:c[0]}),t.createElement(b,{style:c[1]}),t.createElement(b,{style:c[2]}),t.createElement(b,{style:c[3]})),t.createElement(b,{style:a.numberBox},[1,2,3,4,5,6,7,8,9,"",0,"back"].map((y,g)=>y!==""?t.createElement(Se,{style:a.number,key:g,onPress:()=>{if(typeof y=="number"){let i=O+y.toString();C(i);let h=c;h[i.length-1]=a.white_circle,u(h),i.length===4&&setTimeout(()=>{if(!o)i===H(m(p,"passcode"),`${P[5]}${P[6]}${P[0]}`)?(N.pop(),e(),S.open({content:"Successfully unlocked!",source:re})):(C(""),u(s),S.open({content:"Incorrect password. Try again.",source:ie}));else if(!M)D(i),C(""),u(s),S.open({content:"Retype new passcode to confirm.",source:Me});else{if(M===i){let I=H(M,`${P[5]}${P[6]}${P[0]}`);E(p,"passcode",I),S.open({content:"Successfully set new passcode!",source:re})}else S.open({content:"Passcode didn't match.",source:ie});N.pop()}},200)}else{let i=O.slice(0,-1);C(i);let h=c;h[i.length]=a.gray_circle,u(h)}}},typeof y=="number"?t.createElement(T,{style:a.numberText},y):t.createElement($,{source:Ne})):t.createElement(b,{style:a.number,key:g}))))}return t.createElement(ge.NavigationContainer,null,t.createElement(ne.Navigator,{initialRouteName:"K2geLocker",style:B.container,screenOptions:{cardOverlayEnabled:!1,cardShadowEnabled:!1,cardStyle:B.cardStyle,headerStyle:B.header,headerTitleContainerStyle:B.headerTitleContainer,headerTitleAlign:"center",safeAreaInsets:{top:0}}},t.createElement(ne.Screen,{name:"K2geLocker",component:L,options:{headerTitleStyle:{color:"white"},headerLeft:()=>{if(r)return t.createElement(X,{color:B.close.color,title:"Close",onPress:()=>N.pop()})},...J.TransitionPresets.ModalSlideFromBottomIOS}})))}l("img_nitro_star");const xe=l("Small"),Pe=l("img_account_sync_github_white"),De=l("img_account_sync_twitter_white"),Ae=l("ic_message_retry"),Be=l("hub-invite"),Oe=l("ic_lock"),Fe=l("toast_image_saved"),Ke=l("ic_drag_icon_24px");var Ge=({settings:e})=>{const o=F.createThemedStyleSheet({container:{flexDirection:"row",justifyContent:"center",alignItems:"center"},image:{width:70,height:70,marginTop:20,marginLeft:20},title:{flexDirection:"column"},name:{fontSize:30,paddingTop:20,paddingLeft:20,paddingRight:30,color:w.ThemeColorMap.HEADER_PRIMARY},author:{fontSize:15,paddingLeft:50,color:w.ThemeColorMap.HEADER_SECONDARY},info:{height:45,paddingTop:3,paddingBottom:3,justifyContent:"center",alignItems:"center"},footer:{color:w.ThemeColorMap.HEADER_SECONDARY,textAlign:"center",paddingTop:10,paddingBottom:20}});return t.createElement(fe,null,t.createElement(b,{style:o.container},t.createElement($,{source:{uri:"https://avatars.githubusercontent.com/u/43488869"},style:o.image}),t.createElement(b,{style:o.title},t.createElement(T,{style:o.name},"K2geLocker"),t.createElement(T,{style:o.author},"by mafu"))),t.createElement(q,{title:"SETTINGS"},t.createElement(d,{label:"Setup Passcode",trailing:d.Arrow,leading:t.createElement(d.Icon,{source:Ke}),subLabel:"Open password setup modal",onPress:()=>{N.push(j,{isSetup:!0})}}),t.createElement(d,{label:"Reload Discord",trailing:d.Arrow,leading:t.createElement(d.Icon,{source:Ae}),subLabel:"Reloading is required in order to properly initialize K2geLocker after enabling plugin",onPress:()=>{te()}}),t.createElement(d,{label:"Enable app-wide locking",subLabel:"You can lock entire app with passcode!",leading:t.createElement(d.Icon,{source:Oe}),trailing:t.createElement(U,{value:e.getBoolean("lock_app",!1),onValueChange:r=>{r&&e.get("passcode")===void 0?(S.open({content:"Please set passcode in plugin setting first!",source:xe}),r=!1):e.set("lock_app",r)}})}),t.createElement(d,{label:"Enable invitation menu hijacking",subLabel:"Useful for iPad on which can't long press icon. For servers with inv disabled, use /lock command.",leading:t.createElement(d.Icon,{source:Be}),trailing:t.createElement(U,{value:e.getBoolean("inv_hijack",!0),onValueChange:r=>{e.set("inv_hijack",r)}})}),t.createElement(d,{label:"Check for updates",subLabel:"Whether automatically check or not. You can tap here to check manually too.",leading:t.createElement(d.Icon,{source:Fe}),trailing:t.createElement(U,{value:e.getBoolean("check_updates",!0),onValueChange:r=>{e.set("check_updates",r)}}),onPress:()=>{oe(!0)}})),t.createElement(q,{title:"INFORMATION"},t.createElement(d,{label:"Twitter @m4fn3",style:o.info,trailing:d.Arrow,leading:t.createElement(d.Icon,{source:De}),onPress:()=>{G.openURL("https://twitter.com/m4fn3")}}),t.createElement(d,{label:"GitHub (m4fn3)",style:o.info,trailing:d.Arrow,leading:t.createElement(d.Icon,{source:Pe}),onPress:()=>{G.openURL("https://github.com/m4fn3/K2geLocker")}})),t.createElement(T,{style:o.footer},`v${ee}`))},se;(function(e){e[e.BuiltIn=0]="BuiltIn",e[e.Guild=1]="Guild",e[e.DM=2]="DM"})(se||(se={}));var z;(function(e){e[e.Chat=1]="Chat",e[e.User=2]="User",e[e.Message=3]="Message"})(z||(z={}));var le;(function(e){e[e.BuiltIn=0]="BuiltIn",e[e.BuiltInText=1]="BuiltInText",e[e.BuiltInIntegration=2]="BuiltInIntegration",e[e.Bot=3]="Bot",e[e.Placeholder=4]="Placeholder"})(le||(le={}));var ce;(function(e){e[e.Role=1]="Role",e[e.User=2]="User"})(ce||(ce={}));var ae;(function(e){e[e.SubCommand=1]="SubCommand",e[e.SubCommandGroup=2]="SubCommandGroup",e[e.String=3]="String",e[e.Integer=4]="Integer",e[e.Boolean=5]="Boolean",e[e.User=6]="User",e[e.Channel=7]="Channel",e[e.Role=8]="Role",e[e.Mentionnable=9]="Mentionnable",e[e.Number=10]="Number",e[e.Attachment=11]="Attachment"})(ae||(ae={}));var de;(function(e){e[e.ApplicationCommand=2]="ApplicationCommand",e[e.MessageComponent=3]="MessageComponent"})(de||(de={}));const $e=l("img_nitro_star"),Ue=l("Small"),He={id:"lock",name:"lock",displayName:"lock",description:"Lock the server with passcode",displayDescription:"Lock the server with passcode",type:z.Chat,execute:async function(e,o){m(p,"passcode")===void 0?S.open({content:"Please set passcode in plugin setting before you lock the server!",source:Ue}):(E(p,o.guild.id,!0),S.open({content:"Successfully locked!",source:$e}))}},_=be("K2geLocker"),[Ye,je,ze,Ve,We]=Q(x.byName("MessagesConnected",!1),x.byProps("openLazy","hideActionSheet"),x.byProps("getLastSelectedGuildId"),x.byProps("getMostRecentSelectedTextChannelId"),x.byProps("_currentDispatchActionType","_subscriptions","_waitQueue")),[Je,Qe,me,Xe]=[K("AppStateStore"),K("DeveloperOptionsStore"),K("ModalDeprecatedStore"),K("GatewayConnectionStore")],qe=l("nsfw_gate_lock"),ue=l("img_nitro_star"),V=l("Small"),Ze=l("ic_locked_24px"),et=l("ic_full_server_gating_24px");function tt(e,o){m("K2geLocker",e)===void 0&&E("K2geLocker",e,o)}const ot={..._e,onStart(){this.commands=[He];let e=this.name;[["inv_hijack",!0],["check_updates",!0],["lock_app",!1]].forEach(s=>{tt(s[0],s[1])});function o(s){let c=Ve.getMostRecentSelectedTextChannelId(s);We.dispatch({type:"CHANNEL_SELECT",guildId:s,channelId:c,messageId:void 0,jumpType:"ANIMATED",preserveDrawerState:!1,source:void 0})}function r(s){N.push(j,{callback:()=>{E(e,s,!1),o(s)}})}function v(){N.push(j,{callback:()=>{k=!1},showClose:!1})}let k=!1,L=!0;_.before(Je,"APP_STATE_UPDATE",(s,c,u)=>{let f=c[0].state;m(e,"lock_app")&&!k&&(m(e,"passcode")===void 0?E(e,"lock_app",!1):(L||f=="background")&&(v(),k=!0,L=!1))});const a=_.after(b,"render",(s,c,u)=>{const f=Z(u,g=>{var i,h,I;return((i=g.props)==null?void 0:i.delayLongPress)==300&&((h=g.props)==null?void 0:h.onGuildSelected)===void 0&&((I=g.props)==null?void 0:I.guild)});if(f){_.before(f.type,"type",(g,i,h)=>{m(e,i[0].guild.id)?m(e,"passcode")===void 0?(E(e,i[0].guild.id,void 0),i[0].onGuildSelected=void 0):i[0].onGuildSelected=r:i[0].onGuildSelected=void 0});return}const y=Z(u,g=>{var i,h,I;return((i=g.props)==null?void 0:i.guildId)&&((h=g.props)==null?void 0:h.yPos)&&((I=g.props)==null?void 0:I.onClose)});!y||(_.after(y.type,"render",(g,i,h)=>(m(e,i[0].guildId)?h.props.rows=[{icon:et,text:"Unlock Server",onClick:()=>{r(i[0].guildId)}}]:h.props.rows.unshift({icon:Ze,text:"Lock Server",onClick:()=>{m(e,"passcode")===void 0?S.open({content:"Please set passcode in plugin setting before you lock the server!",source:V}):m(e,i[0].guildId)?S.open({content:"This server is already locked!",source:V}):(E(e,i[0].guildId,!0),S.open({content:"Successfully locked!",source:ue}))}}),h)),a())});_.instead(Ye,"default",(s,c,u)=>{var f;let y=u.apply(s,c),g=(f=y==null?void 0:y.props)==null?void 0:f.guildId;if(g&&m(e,g)){const i=F.createThemedStyleSheet({container:{fontFamily:w.Fonts.PRIMARY_SEMIBOLD,flex:1,alignItems:"center",justifyContent:"center",backgroundColor:w.ThemeColorMap.BACKGROUND_PRIMARY},image:{width:120,height:120,padding:5,marginBottom:30},header:{color:w.ThemeColorMap.HEADER_PRIMARY,fontWeight:"bold",fontSize:25,marginBottom:30},button:{fontSize:30},footer:{color:w.ThemeColorMap.HEADER_SECONDARY,fontSize:16,marginTop:80,marginBottom:70}});return t.createElement(b,{style:i.container},t.createElement($,{style:i.image,source:qe}),t.createElement(T,{style:i.header},"This server is locked!"),t.createElement(X,{style:i.button,onPress:()=>r(g),title:"Unlock"}),t.createElement(T,{style:i.footer},"K2geLocker"))}else return y}),_.instead(je,"openLazy",(s,c,u)=>{let f=c[1];if((f.startsWith("instant-invite")||f.startsWith("vanity-url-invite"))&&m(e,"inv_hijack")){let y=ze.getLastSelectedGuildId();m(e,y)?R.show({title:"K2geLocker",body:"This server is locked",confirmText:"Ok"}):R.show({title:"K2geLocker",body:"Select an action",confirmText:"Lock the Server",cancelText:"Open invite menu",onConfirm:()=>{m(e,"passcode")===void 0?S.open({content:"Please set passcode in plugin setting before you lock the server!",source:V}):(E(e,y,!0),S.open({content:"Successfully locked!",source:ue}))},onCancel:()=>{u.apply(s,c)}})}else u.apply(s,c)}),_.before(Qe,"LOGOUT",(s,c,u)=>{R.show({title:"K2geLocker",body:`Automatically disabled itself to prevent app from causing weird problems!
Please enable plugin manually after you re-login to the account.`,confirmText:"See you again!"}),this.commands=[],_.unpatchAll(),window.enmity.plugins.disablePlugin("K2geLocker")});let M=!1,D=[];_.before(Xe,"PUSH_NOTIFICATION_CLICK",(s,c,u)=>{M=!0,D=[]});const O=["MODAL_POP_ALL","CHANGE_LOG_CLOSE","CHANNEL_SETTINGS_CLOSE","GUILD_SETTINGS_CLOSE","EMAIL_VERIFICATION_MODAL_CLOSE","NOTIFICATION_SETTINGS_MODAL_CLOSE","SEARCH_MODAL_CLOSE","USER_SETTINGS_MODAL_CLOSE","MENTION_MODAL_CLOSE"];Object.keys(me).forEach(s=>{O.includes(s)&&_.instead(me,s,(c,u,f)=>{M&&!Object.keys(D).includes(s)?D[s]=!0:f.apply(c,u)})}),m(e,"check_updates")&&(m(e,"updating")?E(p,"updating",!1):oe());let C=H(m(e,"passcode"),`${e[0]}${e[1]}${e[4]}`);isNaN(C)&&C!==void 0&&E(e,"passcode",void 0)},onStop(){this.commands=[],_.unpatchAll()},getSettingsPanel({settings:e}){return t.createElement(Ge,{settings:e})}};he(ot);
