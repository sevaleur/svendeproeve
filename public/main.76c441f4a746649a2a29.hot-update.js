/*! For license information please see main.76c441f4a746649a2a29.hot-update.js.LICENSE.txt */
"use strict";self.webpackHotUpdatesvendeproeve("main",{"./app/components/Navigation.js":(e,t,n)=>{n.r(t),n.d(t,{default:()=>a}),Object(function(){var e=new Error("Cannot find module 'classes/Component'");throw e.code="MODULE_NOT_FOUND",e}());class a extends(Object(function(){var e=new Error("Cannot find module 'classes/Component'");throw e.code="MODULE_NOT_FOUND",e}())){constructor({template:e}){super({element:".navigation",elements:{}})}show(){}hide(){}}},"./app/index.js":(e,t,n)=>{n.r(t),n.d(t,{default:()=>i});var a=n("./app/components/Navigation.js"),s=n("./app/pages/home/index.js");class i{constructor(){this.createContent(),this.createPages(),this.addLinkListeners()}createContent(){this.content=document.querySelector(".content"),this.template=this.content.getAttribute("data-template")}createNavigation(){this.navigation=new a.default({template:this.template})}createPages(){this.pages={home:new s.default},this.page=this.pages[this.template],this.page.create()}async onChange({url:e}){this.page.hide();const t=await window.fetch(e);if(200===t.status){const e=await t.text(),n=document.createElement("div");n.innerHTML=e;const a=n.querySelector(".content");this.template=a.getAttribute("data-template"),this.content.setAttribute("data-template",this.template),this.content.innerHTML=a.innerHTML,this.page=this.pages[this.template],this.page.create(),this.page.show(),this.addLinkListeners()}else console.log("error")}addLinkListeners(){document.querySelectorAll("a").forEach((e=>{e.onclick=t=>{t.preventDefault();const{href:n}=e;this.onChange({url:n})}}))}}new i}},(function(e){e.h=()=>"ab2d6841dd31734de44b"}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi43NmM0NDFmNGE3NDY2NDlhMmEyOS5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7a1BBRWUsTUFBTUEsVUFBbUJDLE9BQUFBLFdBQUFBLElBQUFBLEVBQUFBLElBQUFBLE1BQUFBLDBDQUFBQSxNQUFBQSxFQUFBQSxLQUFBQSxtQkFBQUEsQ0FBQUEsQ0FBQUEsS0FFdENDLFdBQUFBLEVBQVksU0FBRUMsSUFFWkMsTUFBTSxDQUNKQyxRQUFTLGNBQ1RDLFNBQ0EsQ0FFQSxHQUVKLENBRUFDLElBQUFBLEdBR0EsQ0FFQUMsSUFBQUEsR0FHQSx3SUNuQmEsTUFBTUMsRUFFbkJQLFdBQUFBLEdBRUVRLEtBQUtDLGdCQUVMRCxLQUFLRSxjQUVMRixLQUFLRyxrQkFDUCxDQU1BRixhQUFBQSxHQUVFRCxLQUFLSSxRQUFVQyxTQUFTQyxjQUFjLFlBQ3RDTixLQUFLUCxTQUFXTyxLQUFLSSxRQUFRRyxhQUFhLGdCQUM1QyxDQUVBQyxnQkFBQUEsR0FFRVIsS0FBS1MsV0FBYSxJQUFJbkIsRUFBQUEsUUFBVyxDQUMvQkcsU0FBVU8sS0FBS1AsVUFFbkIsQ0FFQVMsV0FBQUEsR0FFRUYsS0FBS1UsTUFBUSxDQUNYQyxLQUFNLElBQUlDLEVBQUFBLFNBR1paLEtBQUthLEtBQU9iLEtBQUtVLE1BQU1WLEtBQUtQLFVBQzVCTyxLQUFLYSxLQUFLQyxRQUNaLENBTUEsY0FBTUMsRUFBUyxJQUFFQyxJQUVmaEIsS0FBS2EsS0FBS2YsT0FFVixNQUFNbUIsUUFBWUMsT0FBT0MsTUFBTUgsR0FFL0IsR0FBa0IsTUFBZkMsRUFBSUcsT0FDUCxDQUNFLE1BQU1DLFFBQWFKLEVBQUlLLE9BQ2pCQyxFQUFNbEIsU0FBU21CLGNBQWMsT0FLbkNELEVBQUlFLFVBQVlKLEVBRWhCLE1BQU1LLEVBQWFILEVBQUlqQixjQUFjLFlBRXJDTixLQUFLUCxTQUFXaUMsRUFBV25CLGFBQWEsaUJBRXhDUCxLQUFLSSxRQUFRdUIsYUFBYSxnQkFBaUIzQixLQUFLUCxVQUNoRE8sS0FBS0ksUUFBUXFCLFVBQVlDLEVBQVdELFVBRXBDekIsS0FBS2EsS0FBT2IsS0FBS1UsTUFBTVYsS0FBS1AsVUFDNUJPLEtBQUthLEtBQUtDLFNBRVZkLEtBQUthLEtBQUtoQixPQUVWRyxLQUFLRyxrQkFDUCxNQUdFeUIsUUFBUUMsSUFBSSxRQUVoQixDQUVBMUIsZ0JBQUFBLEdBRWdCRSxTQUFTeUIsaUJBQWlCLEtBRWxDQyxTQUFRQyxJQUVaQSxFQUFLQyxRQUFVQyxJQUViQSxFQUFNQyxpQkFFTixNQUFNLEtBQUVDLEdBQVNKLEVBQ2pCaEMsS0FBS2UsU0FBUyxDQUFFQyxJQUFLb0IsR0FBTyxDQUM3QixHQUVMLEVBR0YsSUFBSXJDLGlCQ25HSnNDLEVBQW9CQyxFQUFJLElBQU0iLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zdmVuZGVwcm9ldmUvLi9hcHAvY29tcG9uZW50cy9OYXZpZ2F0aW9uLmpzIiwid2VicGFjazovL3N2ZW5kZXByb2V2ZS8uL2FwcC9pbmRleC5qcyIsIndlYnBhY2s6Ly9zdmVuZGVwcm9ldmUvd2VicGFjay9ydW50aW1lL2dldEZ1bGxIYXNoIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb21wb25lbnQgZnJvbSAnY2xhc3Nlcy9Db21wb25lbnQnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE5hdmlnYXRpb24gZXh0ZW5kcyBDb21wb25lbnRcbntcbiAgY29uc3RydWN0b3IoeyB0ZW1wbGF0ZSB9KVxuICB7XG4gICAgc3VwZXIoe1xuICAgICAgZWxlbWVudDogJy5uYXZpZ2F0aW9uJyxcbiAgICAgIGVsZW1lbnRzOlxuICAgICAge1xuICAgICAgIFxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBzaG93KClcbiAge1xuXG4gIH1cblxuICBoaWRlKClcbiAge1xuXG4gIH1cbn1cbiIsImltcG9ydCBOYXZpZ2F0aW9uIGZyb20gJ2NvbXBvbmVudHMvTmF2aWdhdGlvbidcblxuaW1wb3J0IEhvbWUgZnJvbSAncGFnZXMvaG9tZSdcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBwXG57XG4gIGNvbnN0cnVjdG9yKClcbiAge1xuICAgIHRoaXMuY3JlYXRlQ29udGVudCgpXG4gICAgLy90aGlzLmNyZWF0ZU5hdmlnYXRpb24oKVxuICAgIHRoaXMuY3JlYXRlUGFnZXMoKVxuXG4gICAgdGhpcy5hZGRMaW5rTGlzdGVuZXJzKClcbiAgfVxuXG4gIC8qXG4gICAgQ1JFQVRFLlxuICAqL1xuXG4gIGNyZWF0ZUNvbnRlbnQoKVxuICB7XG4gICAgdGhpcy5jb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRlbnQnKVxuICAgIHRoaXMudGVtcGxhdGUgPSB0aGlzLmNvbnRlbnQuZ2V0QXR0cmlidXRlKCdkYXRhLXRlbXBsYXRlJylcbiAgfVxuXG4gIGNyZWF0ZU5hdmlnYXRpb24oKVxuICB7XG4gICAgdGhpcy5uYXZpZ2F0aW9uID0gbmV3IE5hdmlnYXRpb24oe1xuICAgICAgdGVtcGxhdGU6IHRoaXMudGVtcGxhdGVcbiAgICB9KVxuICB9XG5cbiAgY3JlYXRlUGFnZXMoKVxuICB7XG4gICAgdGhpcy5wYWdlcyA9IHtcbiAgICAgIGhvbWU6IG5ldyBIb21lKClcbiAgICB9XG5cbiAgICB0aGlzLnBhZ2UgPSB0aGlzLnBhZ2VzW3RoaXMudGVtcGxhdGVdXG4gICAgdGhpcy5wYWdlLmNyZWF0ZSgpXG4gIH1cblxuICAvKlxuICAgIEVWRU5UUy5cbiAgKi9cblxuICBhc3luYyBvbkNoYW5nZSh7IHVybCwgLyogcHVzaCA9IHRydWUgKi8gfSlcbiAge1xuICAgIHRoaXMucGFnZS5oaWRlKClcblxuICAgIGNvbnN0IHJlcSA9IGF3YWl0IHdpbmRvdy5mZXRjaCh1cmwpXG5cbiAgICBpZihyZXEuc3RhdHVzID09PSAyMDApXG4gICAge1xuICAgICAgY29uc3QgaHRtbCA9IGF3YWl0IHJlcS50ZXh0KClcbiAgICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG5cbiAgICAgIC8qIGlmKHB1c2gpXG4gICAgICAgIHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZSh7fSwgJycsIHVybCkgKi9cblxuICAgICAgZGl2LmlubmVySFRNTCA9IGh0bWxcblxuICAgICAgY29uc3QgZGl2Q29udGVudCA9IGRpdi5xdWVyeVNlbGVjdG9yKCcuY29udGVudCcpXG5cbiAgICAgIHRoaXMudGVtcGxhdGUgPSBkaXZDb250ZW50LmdldEF0dHJpYnV0ZSgnZGF0YS10ZW1wbGF0ZScpXG5cbiAgICAgIHRoaXMuY29udGVudC5zZXRBdHRyaWJ1dGUoJ2RhdGEtdGVtcGxhdGUnLCB0aGlzLnRlbXBsYXRlKVxuICAgICAgdGhpcy5jb250ZW50LmlubmVySFRNTCA9IGRpdkNvbnRlbnQuaW5uZXJIVE1MXG5cbiAgICAgIHRoaXMucGFnZSA9IHRoaXMucGFnZXNbdGhpcy50ZW1wbGF0ZV1cbiAgICAgIHRoaXMucGFnZS5jcmVhdGUoKVxuXG4gICAgICB0aGlzLnBhZ2Uuc2hvdygpXG5cbiAgICAgIHRoaXMuYWRkTGlua0xpc3RlbmVycygpXG4gICAgfVxuICAgIGVsc2VcbiAgICB7XG4gICAgICBjb25zb2xlLmxvZygnZXJyb3InKVxuICAgIH1cbiAgfVxuXG4gIGFkZExpbmtMaXN0ZW5lcnMoKVxuICB7XG4gICAgY29uc3QgbGlua3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdhJylcblxuICAgIGxpbmtzLmZvckVhY2gobGluayA9PlxuICAgIHtcbiAgICAgIGxpbmsub25jbGljayA9IGV2ZW50ID0+XG4gICAgICB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcblxuICAgICAgICBjb25zdCB7IGhyZWYgfSA9IGxpbmtcbiAgICAgICAgdGhpcy5vbkNoYW5nZSh7IHVybDogaHJlZiB9KVxuICAgICAgfVxuICAgIH0pXG4gIH1cbn1cblxubmV3IEFwcCgpXG4iLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSAoKSA9PiAoXCJhYjJkNjg0MWRkMzE3MzRkZTQ0YlwiKSJdLCJuYW1lcyI6WyJOYXZpZ2F0aW9uIiwiQ29tcG9uZW50IiwiY29uc3RydWN0b3IiLCJ0ZW1wbGF0ZSIsInN1cGVyIiwiZWxlbWVudCIsImVsZW1lbnRzIiwic2hvdyIsImhpZGUiLCJBcHAiLCJ0aGlzIiwiY3JlYXRlQ29udGVudCIsImNyZWF0ZVBhZ2VzIiwiYWRkTGlua0xpc3RlbmVycyIsImNvbnRlbnQiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJnZXRBdHRyaWJ1dGUiLCJjcmVhdGVOYXZpZ2F0aW9uIiwibmF2aWdhdGlvbiIsInBhZ2VzIiwiaG9tZSIsIkhvbWUiLCJwYWdlIiwiY3JlYXRlIiwib25DaGFuZ2UiLCJ1cmwiLCJyZXEiLCJ3aW5kb3ciLCJmZXRjaCIsInN0YXR1cyIsImh0bWwiLCJ0ZXh0IiwiZGl2IiwiY3JlYXRlRWxlbWVudCIsImlubmVySFRNTCIsImRpdkNvbnRlbnQiLCJzZXRBdHRyaWJ1dGUiLCJjb25zb2xlIiwibG9nIiwicXVlcnlTZWxlY3RvckFsbCIsImZvckVhY2giLCJsaW5rIiwib25jbGljayIsImV2ZW50IiwicHJldmVudERlZmF1bHQiLCJocmVmIiwiX193ZWJwYWNrX3JlcXVpcmVfXyIsImgiXSwic291cmNlUm9vdCI6IiJ9