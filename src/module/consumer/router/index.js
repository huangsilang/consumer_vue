
import Home from '@/module/home/page/home.vue';
import upload from '@/module/media/page/upload.vue';
import media_list from '@/module/media/page/media_list.vue';
import consumer_list from '@/module/media/page/consumer_list.vue';
export default [
  {
    path: '/media',
    component: Home,
    name: '消费管理',
    hidden: false,
    iconCls: 'el-icon-document',
    children: [
      { path: '/upload', name: '上传文件',component: upload,hidden: false },
      { path: '/media_list', name: '我的媒资',component: media_list,hidden: false },
      { path: '/consumer_list', name: '我的消费',component: consumer_list,hidden: false }
      ]
  }
]
