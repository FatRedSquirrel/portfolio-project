"use strict";(self.webpackChunkportfolio_project=self.webpackChunkportfolio_project||[]).push([[585],{"./src/shared/ui/redesigned/Popups/components/ListBox/ListBox.stories.tsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{BottomLeft:function(){return BottomLeft},BottomRight:function(){return BottomRight},Readonly:function(){return Readonly},TopLeft:function(){return TopLeft},TopRight:function(){return TopRight},__namedExportsOrder:function(){return __namedExportsOrder}});var _ListBox__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/shared/ui/redesigned/Popups/components/ListBox/ListBox.tsx"),_shared_config_storybook_ContainerDecorator__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/shared/config/storybook/ContainerDecorator/index.tsx"),_shared_config_storybook_NewDesignDecorator_NewDesignDecorator__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/shared/config/storybook/NewDesignDecorator/NewDesignDecorator.tsx"),_ListBox_module_scss__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/shared/ui/redesigned/Popups/components/ListBox/ListBox.module.scss"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/react/jsx-runtime.js");__webpack_exports__.default={title:"ui/redesigned/Popups/ListBox",component:_ListBox__WEBPACK_IMPORTED_MODULE_0__.w,argTypes:{backgroundColor:{control:"color"}},decorators:[(0,_shared_config_storybook_ContainerDecorator__WEBPACK_IMPORTED_MODULE_1__.A)({maxWidth:1600,padding:300}),_shared_config_storybook_NewDesignDecorator_NewDesignDecorator__WEBPACK_IMPORTED_MODULE_2__.Z]};const Template=args=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_ListBox__WEBPACK_IMPORTED_MODULE_0__.w,{...args});Template.displayName="Template";const items=[{content:"Опция 1",value:"options 1"},{content:"Опция 2",value:"options 2"},{content:"Опция 3 (disabled)",value:"options 3",disabled:!0}],BottomRight=Template.bind({});BottomRight.args={items:items,value:items[0].value,label:"BottomRight",className:_ListBox_module_scss__WEBPACK_IMPORTED_MODULE_3__.Z.stories};const BottomLeft=Template.bind({});BottomLeft.args={items:items,value:items[0].value,label:"BottomLeft",direction:"bottom left",className:_ListBox_module_scss__WEBPACK_IMPORTED_MODULE_3__.Z.stories};const TopLeft=Template.bind({});TopLeft.args={items:items,value:items[0].value,label:"TopLeft",direction:"top left",className:_ListBox_module_scss__WEBPACK_IMPORTED_MODULE_3__.Z.stories};const TopRight=Template.bind({});TopRight.args={items:items,value:items[0].value,label:"TopRight",direction:"top right",className:_ListBox_module_scss__WEBPACK_IMPORTED_MODULE_3__.Z.stories};const Readonly=Template.bind({});Readonly.args={items:items,value:items[0].value,label:"Readonly",readonly:!0,className:_ListBox_module_scss__WEBPACK_IMPORTED_MODULE_3__.Z.stories},BottomRight.parameters={...BottomRight.parameters,docs:{...BottomRight.parameters?.docs,source:{originalSource:"args => <ListBox {...args} />",...BottomRight.parameters?.docs?.source}}},BottomLeft.parameters={...BottomLeft.parameters,docs:{...BottomLeft.parameters?.docs,source:{originalSource:"args => <ListBox {...args} />",...BottomLeft.parameters?.docs?.source}}},TopLeft.parameters={...TopLeft.parameters,docs:{...TopLeft.parameters?.docs,source:{originalSource:"args => <ListBox {...args} />",...TopLeft.parameters?.docs?.source}}},TopRight.parameters={...TopRight.parameters,docs:{...TopRight.parameters?.docs,source:{originalSource:"args => <ListBox {...args} />",...TopRight.parameters?.docs?.source}}},Readonly.parameters={...Readonly.parameters,docs:{...Readonly.parameters?.docs,source:{originalSource:"args => <ListBox {...args} />",...Readonly.parameters?.docs?.source}}};const __namedExportsOrder=["BottomRight","BottomLeft","TopLeft","TopRight","Readonly"]},"./src/shared/config/storybook/ContainerDecorator/index.tsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{A:function(){return ContainerDecorator}});__webpack_require__("./src/app/styles/index.scss");var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/jsx-runtime.js");const ContainerDecorator=style=>Story=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div",{style:style,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Story,{})});try{ContainerDecorator.displayName="ContainerDecorator",ContainerDecorator.__docgenInfo={description:"",displayName:"ContainerDecorator",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/shared/config/storybook/ContainerDecorator/index.tsx#ContainerDecorator"]={docgenInfo:ContainerDecorator.__docgenInfo,name:"ContainerDecorator",path:"src/shared/config/storybook/ContainerDecorator/index.tsx#ContainerDecorator"})}catch(__react_docgen_typescript_loader_error){}},"./src/shared/config/storybook/NewDesignDecorator/NewDesignDecorator.tsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{Z:function(){return NewDesignDecorator}});var _shared_features__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/shared/features/index.ts"),_shared_features_setGetFeatures__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/shared/features/setGetFeatures.ts"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/react/jsx-runtime.js");const NewDesignDecorator=Story=>((0,_shared_features__WEBPACK_IMPORTED_MODULE_0__.zt)({...(0,_shared_features_setGetFeatures__WEBPACK_IMPORTED_MODULE_1__.R2)(),isAppRedesigned:!0}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div",{className:"app_redesigned",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(Story,{})}));NewDesignDecorator.displayName="NewDesignDecorator";try{NewDesignDecorator.displayName="NewDesignDecorator",NewDesignDecorator.__docgenInfo={description:"",displayName:"NewDesignDecorator",props:{decorators:{defaultValue:null,description:"Wrapper components or Storybook decorators that wrap a story.\n\nDecorators defined in Meta will be applied to every story variation.\n@see [Decorators](https://storybook.js.org/docs/addons/introduction/#1-decorators)",name:"decorators",required:!1,type:{name:"DecoratorFunction<ReactRenderer, { [x: string]: any; }>[]"}},parameters:{defaultValue:null,description:"Custom metadata for a story.\n@see [Parameters](https://storybook.js.org/docs/basics/writing-stories/#parameters)",name:"parameters",required:!1,type:{name:"Parameters"}},args:{defaultValue:null,description:"Dynamic data that are provided (and possibly updated by) Storybook and its addons.\n@see [Arg story inputs](https://storybook.js.org/docs/react/api/csf#args-story-inputs)",name:"args",required:!1,type:{name:"Partial<Args>"}},argTypes:{defaultValue:null,description:"ArgTypes encode basic metadata for args, such as `name`, `description`, `defaultValue` for an arg. These get automatically filled in by Storybook Docs.\n@see [Control annotations](https://github.com/storybookjs/storybook/blob/91e9dee33faa8eff0b342a366845de7100415367/addons/controls/README.md#control-annotations)",name:"argTypes",required:!1,type:{name:"Partial<ArgTypes<Args>>"}},loaders:{defaultValue:null,description:"Asynchronous functions which provide data for a story.\n@see [Loaders](https://storybook.js.org/docs/react/writing-stories/loaders)",name:"loaders",required:!1,type:{name:"LoaderFunction<ReactRenderer, Args>[]"}},render:{defaultValue:null,description:"Define a custom render function for the story(ies). If not passed, a default render function by the renderer will be used.",name:"render",required:!1,type:{name:"ArgsStoryFn<ReactRenderer, Args>"}},storyName:{defaultValue:null,description:"Override the display name in the UI (CSF v2)",name:"storyName",required:!1,type:{name:"string"}},play:{defaultValue:null,description:"Function that is executed after the story is rendered.",name:"play",required:!1,type:{name:"PlayFunction<ReactRenderer, Args>"}},tags:{defaultValue:null,description:"Named tags for a story, used to filter stories in different contexts.",name:"tags",required:!1,type:{name:"string[]"}},story:{defaultValue:null,description:"@deprecated",name:"story",required:!1,type:{name:'Omit<StoryAnnotations<ReactRenderer, Args, Partial<Args>>, "story">'}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/shared/config/storybook/NewDesignDecorator/NewDesignDecorator.tsx#NewDesignDecorator"]={docgenInfo:NewDesignDecorator.__docgenInfo,name:"NewDesignDecorator",path:"src/shared/config/storybook/NewDesignDecorator/NewDesignDecorator.tsx#NewDesignDecorator"})}catch(__react_docgen_typescript_loader_error){}}}]);