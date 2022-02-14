
//交换一下首页
//import HomePage from  '../pages/social.vue';
//import SocialPage from '../pages/home.vue'; 
//import AboutPage from '../pages/about.vue';
//import FormPage from '../pages/form.vue';
//import CatalogPage from '../pages/catalog.vue';
//import ProductPage from '../pages/product.vue';
//import SettingsPage from '../pages/settings.vue';
//import MyselfPage  from '../pages/my.vue';
//import PhoneLoginPage  from '../pages/login.vue';
//import TeaHousePage  from '../pages/teaHouse.vue';
//import TableListPage  from '../pages/tableList.vue';
//import FamilyCreatePage from '../pages/familyCreate.vue';
//import FamilyAddPage from '../pages/familyAdd.vue';
//import FamilyPosterPage from '../pages/familyPoster.vue';
//import MessagePage  from '../pages/message.vue';
//import ProfilePage  from '../pages/profile.vue';
//import CoinsPage  from '../pages/coins.vue';
//import BeansPage  from '../pages/beans.vue';
//import ScoresPage  from '../pages/scores.vue';
//import DebugPage from '../pages/debug.vue';
//import LogoutPage from '../pages/logout.vue';
//import AvatarEditPage from '../pages/avatarEdit.vue';
//import AskPage from '../pages/ask.vue';
//import InfoPage from '../pages/info.vue';
//import VideoSelectPage from '../pages/video_select.vue';
//import TestDataTable from '../pages/debug_ok/data_table.vue'
//import DynamicRoutePage from '../pages/dynamic-route.vue';
import RequestAndLoad from '../pages/request-and-load.vue';

import NotFoundPage from '../pages/404.vue';

var routes = [
  {
    path: '/',
    //component: () => import('@/pages/social'),
    component: () => import('@/pages/social'),                  //webpacket
    asyncComponent: () => import('@/pages/video_select'),       //framework7 vue 
    //component: HomePage,
  },
  {
    path: '/video_select/',
    asyncComponent: () => import('@/pages/video_select'),
    //component: VideoSelectPage,
  },
  {
    path: '/social/',
    asyncComponent: () => import('@/pages/home'),
    //component: SocialPage,
  },
  {
    path: '/about/',
    asyncComponent: () => import('@/pages/about'),
    //component: AboutPage,
  },
  {
    path: '/coins/',
    asyncComponent: () => import('@/pages/coins'),
    //component: CoinsPage,
  },
  {
    path: '/beans/',
    asyncComponent: () => import('@/pages/beans'),
    //component: BeansPage,
  },
  {
    path: '/scores/',
    asyncComponent: () => import('@/pages/scores'),
    //component: ScoresPage,
  },
  {
    path: '/form/',
    asyncComponent: () => import('@/pages/form'),
    //component: FormPage,
  },
  {
    path: '/catalog/',
    asyncComponent: () => import('@/pages/catalog'),
    //component: CatalogPage,
  },
  {
    path: '/product/:id/',
    asyncComponent: () => import('@/pages/product'),
    //component: ProductPage,
  },
  {
    path: '/settings/',
    asyncComponent: () => import('@/pages/teaHouse'),
    //component: TeaHousePage,
  },
  {
    path:'/family-create/',
    asyncComponent: () => import('@/pages/catalog'),
    //component:FamilyCreatePage,
  },
  {
    path:'/family-add/',
    asyncComponent: () => import('@/pages/familyAdd'),
    //component:FamilyAddPage,
  },
  {
    path:'/family-poster/familyId/:fId/',
    asyncComponent: () => import('@/pages/familyPoster'),
    //component:FamilyPosterPage,
  },
  {
    path: '/dynamic-tables/boss/:rId/name/:rName',
    asyncComponent: () => import('@/pages/tableList'),
    //component: TableListPage,
  },
  {
    path: '/message/',
    asyncComponent: () => import('@/pages/message'),
    //component: MessagePage,
  },
  {
    path: '/profile/',
    asyncComponent: () => import('@/pages/profile'),
    //component: ProfilePage,
  },
  {
    path: '/myself/',
    async: function (routeTo, routeFrom, resolve, reject) {
      if(localStorage.login){
        //resolve({component: MyselfPage,})
        resolve({asyncComponent: () => import('@/pages/my'),})
      }else{
        //resolve({component: PhoneLoginPage,})
        resolve({asyncComponent: () => import('@/pages/login'),})
      }
    }
  },
  {
    path: '/myself2/',
    asyncComponent: () => import('@/pages/my'),
    //component: MyselfPage,
  },
  {
    path: '/login/',
    asyncComponent: () => import('@/pages/login'),
    //component: PhoneLoginPage,
  },
  {
    path: '/logout/',
    asyncComponent: () => import('@/pages/logout'),
    //component: LogoutPage,
  },
  {
    path: '/ask/type/:tID/from/:profile/',
    asyncComponent: () => import('@/pages/ask'),
    //component: AskPage,
  },
  {
    path: '/info/json/:jcmd/',
    asyncComponent: () => import('@/pages/info'),
    //component: InfoPage,
  },
  {
    path: '/avatarEdit/',
    asyncComponent: () => import('@/pages/avatarEdit'),
    //component: AvatarEditPage,
  },
  {
    path: '/debug/',
    asyncComponent: () => import('@/pages/debug'),
    //component: DebugPage,
  },
  // {
  //   path: '/test_data_table/',
  //   component: TestDataTable,
  // },
  {
    path: '/dynamic-route/blog/:blogId/post/:postId/',
    asyncComponent: () => import('@/pages/dynamic-route'),
    //component: DynamicRoutePage,
  },
  {
    path: '/request-and-load/user/:userId/',
    async: function (routeTo, routeFrom, resolve, reject) {
      // Router instance
      var router = this;

      // App instance
      var app = router.app;

      // Show Preloader
      app.preloader.show();

      // User ID from request
      var userId = routeTo.params.userId;

      // Simulate Ajax Request
      setTimeout(function () {
        // We got user data from request
        var user = {
          firstName: 'Vladimir',
          lastName: 'Kharlampidi',
          about: 'Hello, i am creator of Framework7! Hope you like it!',
          links: [
            {
              title: 'Framework7 Website',
              url: 'http://framework7.io',
            },
            {
              title: 'Framework7 Forum',
              url: 'http://forum.framework7.io',
            },
          ]
        };
        // Hide Preloader
        app.preloader.hide();

        // Resolve route to load page
        resolve(
          {
            component: RequestAndLoad,
          },
          {
            context: {
              user: user,
            }
          }
        );
      }, 1000);
    },
  },
  {
    path: '(.*)',
    component: NotFoundPage,
  },
];

export default routes;
