const u=window.enmity.modules.common.Constants;window.enmity.modules.common.Clipboard,window.enmity.modules.common.Assets,window.enmity.modules.common.Messages,window.enmity.modules.common.Clyde,window.enmity.modules.common.Avatars,window.enmity.modules.common.Native;const i=window.enmity.modules.common.React;window.enmity.modules.common.Dispatcher,window.enmity.modules.common.Storage;const r=window.enmity.modules.common.Toasts,k=window.enmity.modules.common.Dialog;window.enmity.modules.common.Token,window.enmity.modules.common.REST,window.enmity.modules.common.Settings,window.enmity.modules.common.Users,window.enmity.modules.common.Navigation,window.enmity.modules.common.NavigationNative,window.enmity.modules.common.NavigationStack,window.enmity.modules.common.Theme,window.enmity.modules.common.Linking;const _=window.enmity.modules.common.StyleSheet;window.enmity.modules.common.ColorMap,window.enmity.modules.common.Components,window.enmity.modules.common.Locale,window.enmity.modules.common.Profiles,window.enmity.modules.common.Lodash,window.enmity.modules.common.Logger,window.enmity.modules.common.Flux,window.enmity.modules.common.SVG,window.enmity.modules.common.Scenes,window.enmity.modules.common.Moment;function P(e){window.enmity.plugins.registerPlugin(e)}const v={byProps:(...e)=>window.enmity.modules.filters.byProps(...e),byName:(e,o)=>window.enmity.modules.filters.byName(e,o),byTypeName:(e,o)=>window.enmity.modules.filters.byTypeName(e,o),byDisplayName:(e,o)=>window.enmity.modules.filters.byDisplayName(e,o)};function K(...e){return window.enmity.modules.bulk(...e)}window.enmity.modules.common;const{components:t}=window.enmity;t.Alert,t.Button,t.FlatList;const U=t.Image;t.ImageBackground,t.KeyboardAvoidingView,t.Modal,t.Pressable,t.RefreshControl,t.ScrollView,t.SectionList,t.StatusBar,t.StyleSheet,t.Switch;const F=t.Text,j=t.TextInput;t.TouchableHighlight,t.TouchableOpacity,t.TouchableWithoutFeedback,t.Touchable;const B=t.View;t.VirtualizedList,t.Form,t.FormArrow,t.FormCTA,t.FormCTAButton,t.FormCardSection,t.FormCheckbox;const G=t.FormDivider;t.FormHint,t.FormIcon;const V=t.FormInput;t.FormLabel,t.FormRadio;const $=t.FormRow,z=t.FormSection;t.FormSelect,t.FormSubLabel;const W=t.FormSwitch;t.FormTernaryCheckBox,t.FormText,t.FormTextColors,t.FormTextSizes;function w(e,o,n){window.enmity.settings.set(e,o,n)}function m(e,o,n){return window.enmity.settings.get(e,o,n)}function Y(e){return window.enmity.patcher.create(e)}function l(e){return window.enmity.assets.getIDByName(e)}function E(e,o){let n="";for(let s=0;s<e.length;s++)n+=String.fromCharCode(e.charCodeAt(s)^o.charCodeAt(s%o.length));return n}const S="Love K2ge3 lol",C=l("img_nitro_star"),H=l("Small");var q=({settings:e})=>i.createElement(B,null,i.createElement(z,{title:"Settings"},i.createElement(V,{value:e.get("passcode"),title:"Passcode",placeholder:"input your custom passcode here!",onSubmitEditing:o=>{if(o.nativeEvent.text=="")r.open({content:"Please enter your custom passcode",source:H});else{let n=E(o.nativeEvent.text,`${S[5]}${S[6]}${S[0]}`);e.set("passcode",n),r.open({content:"Successfully set new passcode!",source:C})}},secureTextEntry:!0}),i.createElement(G,null),i.createElement($,{label:"Enable invitation menu hijacking",trailing:i.createElement(W,{value:e.getBoolean("inv_hijack",!0),onValueChange:o=>{e.set("inv_hijack",o)}})}))),L;(function(e){e[e.BuiltIn=0]="BuiltIn",e[e.Guild=1]="Guild",e[e.DM=2]="DM"})(L||(L={}));var f;(function(e){e[e.Chat=1]="Chat",e[e.User=2]="User",e[e.Message=3]="Message"})(f||(f={}));var R;(function(e){e[e.BuiltIn=0]="BuiltIn",e[e.BuiltInText=1]="BuiltInText",e[e.BuiltInIntegration=2]="BuiltInIntegration",e[e.Bot=3]="Bot",e[e.Placeholder=4]="Placeholder"})(R||(R={}));var x;(function(e){e[e.Role=1]="Role",e[e.User=2]="User"})(x||(x={}));var I;(function(e){e[e.SubCommand=1]="SubCommand",e[e.SubCommandGroup=2]="SubCommandGroup",e[e.String=3]="String",e[e.Integer=4]="Integer",e[e.Boolean=5]="Boolean",e[e.User=6]="User",e[e.Channel=7]="Channel",e[e.Role=8]="Role",e[e.Mentionnable=9]="Mentionnable",e[e.Number=10]="Number",e[e.Attachment=11]="Attachment"})(I||(I={}));var M;(function(e){e[e.ApplicationCommand=2]="ApplicationCommand",e[e.MessageComponent=3]="MessageComponent"})(M||(M={}));const J=l("img_nitro_star"),Q=l("Small"),X={id:"lock",name:"lock",displayName:"lock",description:"Lock the server with passcode",displayDescription:"Lock the server with passcode",type:f.Chat,execute:async function(e,o){m("K2geLocker","passcode")===void 0?r.open({content:"Please set passcode in plugin setting before you lock the server!",source:Q}):(w("K2geLocker",o.guild.id,!0),r.open({content:"Successfully locked!",source:J}))}},g=Y("K2geLocker"),[Z,T,A]=K(v.byName("MessagesConnected",!1),v.byProps("openLazy","hideActionSheet"),v.byName("GuildTooltipActionSheets",!1)),O=l("nsfw_gate_lock"),N=l("img_nitro_star"),b=l("Small"),p={name:"K2geLocker",version:"1.0.2",description:"Lock the specific server with passcode.",authors:[{name:"mafu",id:"519760564755365888"}],onStart(){this.commands=[X];let e="0",o=this.name;m(this.name,"inv_hijack")===void 0&&w(this.name,"inv_hijack",!0),g.instead(A,"default",(n,s,c)=>(e=s[0].guildId,c.apply(n,s))),g.instead(Z,"default",(n,s,c)=>{var a;let h=c.apply(n,s),y=(a=h==null?void 0:h.props)==null?void 0:a.guildId;if(y&&m(this.name,y)){const d=_.createThemedStyleSheet({image:{width:100,height:100,padding:5,marginBottom:15},container:{flex:1,alignItems:"center",justifyContent:"center",backgroundColor:u.ThemeColorMap.BACKGROUND_PRIMARY},header:{color:u.ThemeColorMap.HEADER_PRIMARY,fontFamily:u.Fonts.PRIMARY_SEMIBOLD,fontWeight:"bold",fontSize:24},description:{color:u.ThemeColorMap.HEADER_SECONDARY,fontSize:16,fontFamily:u.Fonts.PRIMARY_SEMIBOLD,marginLeft:2.5,marginRight:2.5,marginBottom:70,paddingLeft:25,paddingRight:25,paddingTop:5,textAlign:"center"},passcode:{width:100,height:20,marginTop:50,marginBottom:50,borderBottomWidth:1,borderBottomColor:"#ccc"}});return i.createElement(B,{style:d.container},i.createElement(U,{style:d.image,source:O}),i.createElement(F,{style:d.header},"This server is locked!"),i.createElement(j,{style:d.passcode,onSubmitEditing:D=>{D.nativeEvent.text==E(m(this.name,"passcode"),`${o[0]}${o[1]}${o[4]}`)?(w(this.name,y,!1),r.open({content:"Successfully unlocked!",source:N})):r.open({content:"Incorrect password. Try again.",source:b})},secureTextEntry:!0}),i.createElement(F,{style:d.description},"K2geLocker"))}else return h}),g.instead(T,"openLazy",(n,s,c)=>{let a=s[1];console.log(a),(a.startsWith("instant-invite")||a.startsWith("vanity-url-invite"))&&m(this.name,"inv_hijack")?m(this.name,e)?k.show({title:"K2geLocker",body:"This server is locked",confirmText:"Ok"}):k.show({title:"K2geLocker",body:"Select an action",confirmText:"Lock the Server",cancelText:"Open invite menu",onConfirm:()=>{m(this.name,"passcode")===void 0?r.open({content:"Please set passcode in plugin setting before you lock the server!",source:b}):e=="0"?r.open({content:"It seems that plugin failed to get the server. Please select another channel and try again!",source:b}):(w(this.name,e,!0),r.open({content:"Successfully locked!",source:N}))},onCancel:()=>{c.apply(n,s)}}):c.apply(n,s)})},onStop(){this.commands=[],g.unpatchAll()},getSettingsPanel({settings:e}){return i.createElement(q,{settings:e})}};P(p);
