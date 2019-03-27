<template>
    <div>
        <div class="manage-side manage-bg-black">
            <div class="manage-side-scroll" >
                <!-- 左侧导航区域 -->
                <ul class="manage-nav manage-nav-tree">
                    <router-link v-for="(item, index) in navList" :key="index" tag="li" v-if="item.meta.nav" :to="item.path" class="manage-nav-item"  >
                        <a >{{item.name}}<span class="manage-nav-more"></span></a>
                        <dl class="manage-nav-child" v-if="item.children">
                            <router-link v-for="(itemC, index) in item.children" v-if="itemC.meta.nav" :key="index" tag="dd" :to="itemC.path"><a href="javascript:void (0);">{{itemC.name}}</a></router-link>
                        </dl>
                        <div class="manage-nav-bar"></div>
                    </router-link>
                </ul>
            </div>
        </div>
        <div>
            This is Home Page
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    name:'Home',
    computed: {
            ...mapState({
            navList: function (state) {
                if (state.userInfo.role>=0) {
                    return state.navList
                }
            }
        })
    }
}
</script>
