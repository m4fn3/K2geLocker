const y=window.enmity.modules.common.Constants;window.enmity.modules.common.Clipboard,window.enmity.modules.common.Assets,window.enmity.modules.common.Messages,window.enmity.modules.common.Clyde,window.enmity.modules.common.Avatars,window.enmity.modules.common.Native;const t=window.enmity.modules.common.React;window.enmity.modules.common.Dispatcher,window.enmity.modules.common.Storage;const f=window.enmity.modules.common.Toasts,R=window.enmity.modules.common.Dialog;window.enmity.modules.common.Token;const J=window.enmity.modules.common.REST;window.enmity.modules.common.Settings,window.enmity.modules.common.Users;const M=window.enmity.modules.common.Navigation,he=window.enmity.modules.common.NavigationNative,Q=window.enmity.modules.common.NavigationStack;window.enmity.modules.common.Theme;const G=window.enmity.modules.common.Linking,O=window.enmity.modules.common.StyleSheet;window.enmity.modules.common.ColorMap,window.enmity.modules.common.Components,window.enmity.modules.common.Locale,window.enmity.modules.common.Profiles,window.enmity.modules.common.Lodash,window.enmity.modules.common.Logger,window.enmity.modules.common.Flux,window.enmity.modules.common.SVG,window.enmity.modules.common.Scenes,window.enmity.modules.common.Moment;function we(e){window.enmity.plugins.registerPlugin(e)}function ye(e){return window.enmity.plugins.getPlugin(e)}const N={byProps:(...e)=>window.enmity.modules.filters.byProps(...e),byName:(e,o)=>window.enmity.modules.filters.byName(e,o),byTypeName:(e,o)=>window.enmity.modules.filters.byTypeName(e,o),byDisplayName:(e,o)=>window.enmity.modules.filters.byDisplayName(e,o)};function fe(e,o){return window.enmity.modules.getModule(e,o)}function X(...e){return window.enmity.modules.bulk(...e)}window.enmity.modules.common;const{components:n}=window.enmity;n.Alert;const U=n.Button;n.FlatList;const H=n.Image;n.ImageBackground,n.KeyboardAvoidingView,n.Modal,n.Pressable,n.RefreshControl;const Se=n.ScrollView;n.SectionList,n.StatusBar,n.StyleSheet,n.Switch;const T=n.Text;n.TextInput,n.TouchableHighlight;const be=n.TouchableOpacity;n.TouchableWithoutFeedback,n.Touchable;const E=n.View;n.VirtualizedList,n.Form,n.FormArrow,n.FormCTA,n.FormCTAButton,n.FormCardSection,n.FormCheckbox,n.FormDivider,n.FormHint,n.FormIcon,n.FormInput,n.FormLabel,n.FormRadio;const h=n.FormRow,q=n.FormSection;n.FormSelect,n.FormSubLabel;const $=n.FormSwitch;n.FormTernaryCheckBox,n.FormText,n.FormTextColors,n.FormTextSizes;function b(e,o,r){window.enmity.settings.set(e,o,r)}function w(e,o,r){return window.enmity.settings.get(e,o,r)}function ve(e){return window.enmity.patcher.create(e)}function c(e){return window.enmity.assets.getIDByName(e)}function Z(e,o,r){return window.enmity.utilities.findInReactTree(e,o,r)}var k="K2geLocker",ee="1.2.3",_e="Lock App / Server with passcode!",Ee=[{name:"mafu",id:"519760564755365888"}],pe={name:k,version:ee,description:_e,authors:Ee};function Y(e,o){let r="";for(let S=0;S<e.length;S++)r+=String.fromCharCode(e.charCodeAt(S)^o.charCodeAt(S%o.length));return r}const ke=fe(e=>e._dispatcher._actionHandlers._dependencyGraph.nodes),j=ke._dispatcher._actionHandlers._dependencyGraph.nodes;function F(e){let o=Object.keys(j).filter(r=>j[r].name===e);if(o)return j[o[0]].actionHandler}const{native:A}=window.enmity;function te(){A.reload()}A.version,A.build,A.device,A.version;const Le="https://github.com/m4fn3/K2geLocker",Ce="https://raw.githubusercontent.com/m4fn3/K2geLocker/master/manifest.json",Ie="https://raw.githubusercontent.com/m4fn3/K2geLocker/master/dist/K2geLocker.js",Re="https://raw.githubusercontent.com/m4fn3/K2geLocker/master/changelogs.json";function Te(e,o){window.enmity.plugins.installPlugin(Ie,()=>{R.show({title:"K2geLocker",body:`Updated from ${e} to ${o}!
Do you want to reload Discord now?`,confirmText:"Yes",cancelText:"Later",onConfirm:()=>te()})})}function oe(e=!1){J.get(Ce).then(o=>{const r=JSON.parse(o.text),S=ye(r.name);r.version.localeCompare(S.version,void 0,{numeric:!0})===1?(e||!e&&w(k,"ignored")!=r.version)&&J.get(Re).then(C=>{const I=JSON.parse(C.text);let u="";I[r.version]&&(u=`

- Changelogs
${I[r.version]}`),R.show({title:"K2geLocker",body:`New version v${r.version} is available!${u}`,confirmText:"Update",cancelText:"Ignore",onConfirm:()=>{b(k,"updating",!0),Te(S.version,r.version)},onCancel:()=>b(k,"ignored",r.version)})}):e&&R.show({title:"K2geLocker",body:`You are using latest version v${S.version}!`,confirmText:"OK"})}).catch(o=>{o.status===404&&R.show({title:"K2geLocker",body:"Failed to check for updates. Please check GitHub manually.",confirmText:"GitHub",cancelText:"Close",onConfirm:()=>G.openURL(Le)})})}const ne=Q.createStackNavigator(),[Me]=X(N.byProps("AppState")),P="Love K2ge3 lol";c("nsfw_gate_lock");const re=c("img_nitro_star");c("ic_following");const Ne=c("ic_info_24px"),ie=c("Small"),Pe=c("ic_arrow_back_24px"),B=O.createThemedStyleSheet({container:{backgroundColor:y.ThemeColorMap.BACKGROUND_MOBILE_SECONDARY,flex:1},cardStyle:{backgroundColor:y.ThemeColorMap.BACKGROUND_MOBILE_PRIMARY,color:y.ThemeColorMap.TEXT_NORMAL},header:{backgroundColor:y.ThemeColorMap.BACKGROUND_MOBILE_SECONDARY,shadowColor:"transparent",elevation:0},headerTitleContainer:{color:y.ThemeColorMap.HEADER_PRIMARY},close:{color:y.ThemeColorMap.HEADER_PRIMARY}});function z({callback:e=null,isSetup:o=!1,showClose:r=!0}){const S=Me.useWindowDimensions().width,C=Math.min(S,450);function I(){const u=O.createThemedStyleSheet({container:{flex:1,backgroundColor:y.ThemeColorMap.BACKGROUND_PRIMARY,alignSelf:"center",alignItems:"center",justifyContent:"center",width:C},title:{height:40},titleText:{color:y.ThemeColorMap.HEADER_PRIMARY,fontSize:30},circleBox:{flexDirection:"row",height:130,paddingTop:20},white_circle:{width:20,height:20,borderRadius:10,backgroundColor:"white",marginRight:10},gray_circle:{width:20,height:20,borderRadius:10,backgroundColor:"gray",marginRight:10},numberBox:{flexDirection:"row",flexWrap:"wrap",width:300},number:{width:100,height:70,alignItems:"center",justifyContent:"center"},numberText:{color:y.ThemeColorMap.HEADER_PRIMARY,fontSize:30}});let D=Y(w(k,"passcode"),`${P[5]}${P[6]}${P[0]}`);const[L,K]=t.useState(""),[x,l]=t.useState("");let a=new Array(D.length).fill(u.gray_circle);const[d,g]=t.useState(a);let v=o?"Enter new passcode":"Enter passcode ";return t.createElement(E,{style:u.container},t.createElement(E,{style:u.title},t.createElement(T,{style:u.titleText},v)),t.createElement(E,{style:u.circleBox},d.map((s,i)=>t.createElement(E,{style:d[i]}))),t.createElement(E,{style:u.numberBox},[1,2,3,4,5,6,7,8,9,"",0,"back"].map((s,i)=>s!==""?t.createElement(be,{style:u.number,key:i,onPress:()=>{if(typeof s=="number"){let m=x+s.toString();l(m);let _=d;_[m.length-1]=u.white_circle,g(_),m.length===d.length&&setTimeout(()=>{if(!o)m===D?(M.pop(),e(),f.open({content:"Successfully unlocked!",source:re})):(l(""),g(a),f.open({content:"Incorrect password. Try again.",source:ie}));else if(!L)K(m),l(""),a=new Array(d.length).fill(u.gray_circle),g(a),f.open({content:"Retype new passcode to confirm.",source:Ne});else{if(L===m){let ge=Y(L,`${P[5]}${P[6]}${P[0]}`);b(k,"passcode",ge),f.open({content:"Successfully set new passcode!",source:re})}else f.open({content:"Passcode didn't match.",source:ie});M.pop()}},200)}else{let m=x.slice(0,-1);l(m);let _=d;_[m.length]=u.gray_circle,g(_)}}},typeof s=="number"?t.createElement(T,{style:u.numberText},s):t.createElement(H,{source:Pe})):t.createElement(E,{style:u.number,key:i}))),t.createElement(E,null,[1].filter(s=>o&&!L).map(s=>t.createElement(U,{onPress:()=>{let i=d.length===4?6:4;a=new Array(i).fill(u.gray_circle),g(a),l("")},title:"Change passcode length"}))))}return t.createElement(he.NavigationContainer,null,t.createElement(ne.Navigator,{initialRouteName:"K2geLocker",style:B.container,screenOptions:{cardOverlayEnabled:!1,cardShadowEnabled:!1,cardStyle:B.cardStyle,headerStyle:B.header,headerTitleContainerStyle:B.headerTitleContainer,headerTitleAlign:"center",safeAreaInsets:{top:0}}},t.createElement(ne.Screen,{name:"K2geLocker",component:I,options:{headerTitleStyle:{color:"white"},headerLeft:()=>{if(r)return t.createElement(U,{color:B.close.color,title:"Close",onPress:()=>M.pop()})},...Q.TransitionPresets.ModalSlideFromBottomIOS}})))}c("img_nitro_star");const De=c("Small"),xe=c("img_account_sync_github_white"),Ae=c("img_account_sync_twitter_white"),Be=c("ic_message_retry"),Oe=c("hub-invite"),Fe=c("ic_lock"),Ke=c("toast_image_saved"),Ge=c("ic_drag_icon_24px");var Ue=({settings:e})=>{const o=O.createThemedStyleSheet({container:{flexDirection:"row",justifyContent:"center",alignItems:"center"},image:{width:70,height:70,marginTop:20,marginLeft:20},title:{flexDirection:"column"},name:{fontSize:30,paddingTop:20,paddingLeft:20,paddingRight:30,color:y.ThemeColorMap.HEADER_PRIMARY},author:{fontSize:15,paddingLeft:50,color:y.ThemeColorMap.HEADER_SECONDARY},info:{height:45,paddingTop:3,paddingBottom:3,justifyContent:"center",alignItems:"center"},footer:{color:y.ThemeColorMap.HEADER_SECONDARY,textAlign:"center",paddingTop:10,paddingBottom:20}});return t.createElement(Se,null,t.createElement(E,{style:o.container},t.createElement(H,{source:{uri:"https://avatars.githubusercontent.com/u/43488869"},style:o.image}),t.createElement(E,{style:o.title},t.createElement(T,{style:o.name},"K2geLocker"),t.createElement(T,{style:o.author},"by mafu"))),t.createElement(q,{title:"SETTINGS"},t.createElement(h,{label:"Setup Passcode",trailing:h.Arrow,leading:t.createElement(h.Icon,{source:Ge}),subLabel:"Open password setup modal",onPress:()=>{M.push(z,{isSetup:!0})}}),t.createElement(h,{label:"Reload Discord",trailing:h.Arrow,leading:t.createElement(h.Icon,{source:Be}),subLabel:"Reloading is required in order to properly initialize K2geLocker after enabling plugin",onPress:()=>{te()}}),t.createElement(h,{label:"Enable app-wide locking",subLabel:"You can lock entire app with passcode!",leading:t.createElement(h.Icon,{source:Fe}),trailing:t.createElement($,{value:e.getBoolean("lock_app",!1),onValueChange:r=>{r&&e.get("passcode")===void 0?(f.open({content:"Please set passcode in plugin setting first!",source:De}),r=!1):e.set("lock_app",r)}})}),t.createElement(h,{label:"Enable invitation menu hijacking",subLabel:"Useful for iPad on which can't long press icon. For servers with inv disabled, use /lock command.",leading:t.createElement(h.Icon,{source:Oe}),trailing:t.createElement($,{value:e.getBoolean("inv_hijack",!0),onValueChange:r=>{e.set("inv_hijack",r)}})}),t.createElement(h,{label:"Check for updates",subLabel:"Whether automatically check or not. You can tap here to check manually too.",leading:t.createElement(h.Icon,{source:Ke}),trailing:t.createElement($,{value:e.getBoolean("check_updates",!0),onValueChange:r=>{e.set("check_updates",r)}}),onPress:()=>{oe(!0)}})),t.createElement(q,{title:"INFORMATION"},t.createElement(h,{label:"Twitter @m4fn3",style:o.info,trailing:h.Arrow,leading:t.createElement(h.Icon,{source:Ae}),onPress:()=>{G.openURL("https://twitter.com/m4fn3")}}),t.createElement(h,{label:"GitHub (m4fn3)",style:o.info,trailing:h.Arrow,leading:t.createElement(h.Icon,{source:xe}),onPress:()=>{G.openURL("https://github.com/m4fn3/K2geLocker")}})),t.createElement(T,{style:o.footer},`v${ee}`))},le;(function(e){e[e.BuiltIn=0]="BuiltIn",e[e.Guild=1]="Guild",e[e.DM=2]="DM"})(le||(le={}));var V;(function(e){e[e.Chat=1]="Chat",e[e.User=2]="User",e[e.Message=3]="Message"})(V||(V={}));var se;(function(e){e[e.BuiltIn=0]="BuiltIn",e[e.BuiltInText=1]="BuiltInText",e[e.BuiltInIntegration=2]="BuiltInIntegration",e[e.Bot=3]="Bot",e[e.Placeholder=4]="Placeholder"})(se||(se={}));var ce;(function(e){e[e.Role=1]="Role",e[e.User=2]="User"})(ce||(ce={}));var ae;(function(e){e[e.SubCommand=1]="SubCommand",e[e.SubCommandGroup=2]="SubCommandGroup",e[e.String=3]="String",e[e.Integer=4]="Integer",e[e.Boolean=5]="Boolean",e[e.User=6]="User",e[e.Channel=7]="Channel",e[e.Role=8]="Role",e[e.Mentionnable=9]="Mentionnable",e[e.Number=10]="Number",e[e.Attachment=11]="Attachment"})(ae||(ae={}));var de;(function(e){e[e.ApplicationCommand=2]="ApplicationCommand",e[e.MessageComponent=3]="MessageComponent"})(de||(de={}));const He=c("img_nitro_star"),$e=c("Small"),Ye={id:"lock",name:"lock",displayName:"lock",description:"Lock the server with passcode",displayDescription:"Lock the server with passcode",type:V.Chat,execute:async function(e,o){w(k,"passcode")===void 0?f.open({content:"Please set passcode in plugin setting before you lock the server!",source:$e}):(b(k,o.guild.id,!0),f.open({content:"Successfully locked!",source:He}))}},p=ve("K2geLocker"),[je,ze,Ve,We,Je]=X(N.byName("MessagesConnected",!1),N.byProps("openLazy","hideActionSheet"),N.byProps("getLastSelectedGuildId"),N.byProps("getMostRecentSelectedTextChannelId"),N.byProps("_currentDispatchActionType","_subscriptions","_waitQueue")),[Qe,Xe,me,qe]=[F("AppStateStore"),F("DeveloperOptionsStore"),F("ModalDeprecatedStore"),F("GatewayConnectionStore")],Ze=c("nsfw_gate_lock"),ue=c("img_nitro_star"),W=c("Small"),et=c("ic_locked_24px"),tt=c("ic_full_server_gating_24px");function ot(e,o){w("K2geLocker",e)===void 0&&b("K2geLocker",e,o)}const nt={...pe,onStart(){this.commands=[Ye];let e=this.name;[["inv_hijack",!0],["check_updates",!0],["lock_app",!1]].forEach(l=>{ot(l[0],l[1])});function o(l){let a=We.getMostRecentSelectedTextChannelId(l);Je.dispatch({type:"CHANNEL_SELECT",guildId:l,channelId:a,messageId:void 0,jumpType:"ANIMATED",preserveDrawerState:!1,source:void 0})}function r(l){M.push(z,{callback:()=>{b(e,l,!1),o(l)}})}function S(){M.push(z,{callback:()=>{C=!1},showClose:!1})}let C=!1,I=!0;p.before(Qe,"APP_STATE_UPDATE",(l,a,d)=>{let g=a[0].state;w(e,"lock_app")&&!C&&(w(e,"passcode")===void 0?b(e,"lock_app",!1):(I||g=="background")&&(S(),C=!0,I=!1))});const u=p.after(E,"render",(l,a,d)=>{const g=Z(d,s=>{var i,m,_;return((i=s.props)==null?void 0:i.delayLongPress)==300&&((m=s.props)==null?void 0:m.onGuildSelected)===void 0&&((_=s.props)==null?void 0:_.guild)});if(g){p.before(g.type,"type",(s,i,m)=>{w(e,i[0].guild.id)?w(e,"passcode")===void 0?(b(e,i[0].guild.id,void 0),i[0].onGuildSelected=void 0):i[0].onGuildSelected=r:i[0].onGuildSelected=void 0});return}const v=Z(d,s=>{var i,m,_;return((i=s.props)==null?void 0:i.guildId)&&((m=s.props)==null?void 0:m.yPos)&&((_=s.props)==null?void 0:_.onClose)});!v||(p.after(v.type,"render",(s,i,m)=>(w(e,i[0].guildId)?m.props.rows=[{icon:tt,text:"Unlock Server",onClick:()=>{r(i[0].guildId)}}]:m.props.rows.unshift({icon:et,text:"Lock Server",onClick:()=>{w(e,"passcode")===void 0?f.open({content:"Please set passcode in plugin setting before you lock the server!",source:W}):w(e,i[0].guildId)?f.open({content:"This server is already locked!",source:W}):(b(e,i[0].guildId,!0),f.open({content:"Successfully locked!",source:ue}))}}),m)),u())});p.instead(je,"default",(l,a,d)=>{var g;let v=d.apply(l,a),s=(g=v==null?void 0:v.props)==null?void 0:g.guildId;if(s&&w(e,s)){const i=O.createThemedStyleSheet({container:{fontFamily:y.Fonts.PRIMARY_SEMIBOLD,flex:1,alignItems:"center",justifyContent:"center",backgroundColor:y.ThemeColorMap.BACKGROUND_PRIMARY},image:{width:120,height:120,padding:5,marginBottom:30},header:{color:y.ThemeColorMap.HEADER_PRIMARY,fontWeight:"bold",fontSize:25,marginBottom:30},button:{fontSize:30},footer:{color:y.ThemeColorMap.HEADER_SECONDARY,fontSize:16,marginTop:80,marginBottom:70}});return t.createElement(E,{style:i.container},t.createElement(H,{style:i.image,source:Ze}),t.createElement(T,{style:i.header},"This server is locked!"),t.createElement(U,{style:i.button,onPress:()=>r(s),title:"Unlock"}),t.createElement(T,{style:i.footer},"K2geLocker"))}else return v}),p.instead(ze,"openLazy",(l,a,d)=>{let g=a[1];if((g.startsWith("instant-invite")||g.startsWith("vanity-url-invite"))&&w(e,"inv_hijack")){let v=Ve.getLastSelectedGuildId();w(e,v)?R.show({title:"K2geLocker",body:"This server is locked",confirmText:"Ok"}):R.show({title:"K2geLocker",body:"Select an action",confirmText:"Lock the Server",cancelText:"Open invite menu",onConfirm:()=>{w(e,"passcode")===void 0?f.open({content:"Please set passcode in plugin setting before you lock the server!",source:W}):(b(e,v,!0),f.open({content:"Successfully locked!",source:ue}))},onCancel:()=>{d.apply(l,a)}})}else d.apply(l,a)}),p.before(Xe,"LOGOUT",(l,a,d)=>{R.show({title:"K2geLocker",body:`Automatically disabled itself to prevent app from causing weird problems!
Please enable plugin manually after you re-login to the account.`,confirmText:"See you again!"}),this.commands=[],p.unpatchAll(),window.enmity.plugins.disablePlugin("K2geLocker")});let D=!1,L=[];p.before(qe,"PUSH_NOTIFICATION_CLICK",(l,a,d)=>{D=!0,L=[]});const K=["MODAL_POP_ALL","CHANGE_LOG_CLOSE","CHANNEL_SETTINGS_CLOSE","GUILD_SETTINGS_CLOSE","EMAIL_VERIFICATION_MODAL_CLOSE","NOTIFICATION_SETTINGS_MODAL_CLOSE","SEARCH_MODAL_CLOSE","USER_SETTINGS_MODAL_CLOSE","MENTION_MODAL_CLOSE"];Object.keys(me).forEach(l=>{K.includes(l)&&p.instead(me,l,(a,d,g)=>{D&&!Object.keys(L).includes(l)?L[l]=!0:g.apply(a,d)})}),w(e,"check_updates")&&(w(e,"updating")?b(k,"updating",!1):oe());let x=Y(w(e,"passcode"),`${e[0]}${e[1]}${e[4]}`);isNaN(x)&&x!==void 0&&b(e,"passcode",void 0)},onStop(){this.commands=[],p.unpatchAll()},getSettingsPanel({settings:e}){return t.createElement(Ue,{settings:e})}};we(nt);
