<template>
    <div class="tags-nav">
        <div class="close-con">
            <Dropdown transfer @on-click="handleTagsOption" style="margin-top:7px;">
                <Button size="small" type="text">
                    <Icon :size="18" type="ios-close-circle-outline"/>
                </Button>
                <DropdownMenu slot="list">
                    <DropdownItem name="close-all">关闭所有</DropdownItem>
                    <DropdownItem name="close-others">关闭其他</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
        <ul
            v-show="visible"
            :style="{left: contextMenuLeft + 'px', top: contextMenuTop + 'px'}"
            class="contextmenu"
        >
            <li v-for="(item, key) of menuList" @click="handleTagsOption(key)" :key="key">{{item}}</li>
        </ul>
        <div class="btn-con left-btn">
            <Button @click="handleScroll(240)" type="text">
                <Icon :size="18" type="ios-arrow-back"/>
            </Button>
        </div>
        <div class="btn-con right-btn">
            <Button @click="handleScroll(-240)" type="text">
                <Icon :size="18" type="ios-arrow-forward"/>
            </Button>
        </div>
        <div
            class="scroll-outer"
            ref="scrollOuter"
            @DOMMouseScroll="handlescroll"
            @mousewheel="handlescroll"
        >
            <div ref="scrollBody" class="scroll-body" :style="{left: tagBodyLeft + 'px'}">
                <transition-group name="taglist-moving-animation">
                    <Tag
                        closable
                        checkable
                        @on-change="handleChangePage(item.path)"
                        @on-close="handleClose(item.name,index)"
                        type="dot"
                        :data-route-item="item"
                        :checked="item.name===$route.name"
                        v-for="(item, index) in list"
                        ref="tagsPageOpened"
                        :key="`tag-nav-${index}`"
                        :color="item.name===$route.name ? 'primary' : 'default'"
                        :name="item.name"
                    >{{item.title}}</Tag>
                </transition-group>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "TagsNav",
        props: {
            getMenuList: {
                type: Array,
                default() {
                    return [];
                }
            }
        },
        data() {
            return {
                tagBodyLeft: 0,
                rightOffset: 40,
                outerPadding: 4,
                contextMenuLeft: 0,
                contextMenuTop: 0,
                visible: false,
                list: [],
                menuList: {
                    others: "关闭其他",
                    all: "关闭所有"
                }
            };
        },
        computed: {},
        mounted() {
            let getList = sessionStorage.getItem("personList");
            if (getList) {
                this.list = JSON.parse(getList);
            } else {
                this.list.push(this.getListVal(this.$route));
            }
        },
        methods: {
            getListVal(val) {
                return { name: val.name, path: val.path, title: val.meta.title };
            },
            handleTagsOption(type) {
                if (type.includes("all")) {
                    // 关闭所有，除了home
                    this.$router.push("/systemOutbund");
                    this.list = [this.getListVal(this.$route)];
                } else if (type.includes("others")) {
                    // 关闭除当前页和home页的其他页
                    this.list = this.list.filter(
                        item => item.name === this.$route.name
                    );
                    setTimeout(() => {
                        this.getTagElementByRoute(this.$route);
                    }, 100);
                }
            },
            handleClose(val, ind) {
                if (val === this.$route.name) {
                    if (ind === this.list.length - 1) {
                        this.$router.push(this.list[ind - 1].path);
                    } else {
                        this.$router.push(this.list[ind + 1].path);
                    }
                }
                this.list = this.list.filter(item => {
                    return item.name !== val;
                });
            },
            handleChangePage(path) {
                this.$router.push(path);
            },

            judgePath(name) {
                return (
                    this.list.filter(item => {
                        return item.name === name;
                    }).length === 0
                );
            },
            handlescroll(e) {
                var type = e.type;
                let delta = 0;
                if (type === "DOMMouseScroll" || type === "mousewheel") {
                    delta = e.wheelDelta ? e.wheelDelta : -(e.detail || 0) * 40;
                }
                this.handleScroll(delta);
            },
            handleScroll(offset) {
                const outerWidth = this.$refs.scrollOuter.offsetWidth;
                const bodyWidth = this.$refs.scrollBody.offsetWidth;
                if (offset > 0) {
                    this.tagBodyLeft = Math.min(0, this.tagBodyLeft + offset);
                } else {
                    if (outerWidth < bodyWidth) {
                        if (this.tagBodyLeft < -(bodyWidth - outerWidth)) {
                            this.tagBodyLeft = this.tagBodyLeft;
                        } else {
                            this.tagBodyLeft = Math.max(
                                this.tagBodyLeft + offset,
                                outerWidth - bodyWidth
                            );
                        }
                    } else {
                        this.tagBodyLeft = 0;
                    }
                }
            },
            getTagElementByRoute(route) {
                this.$nextTick(() => {
                    this.refsTag = this.$refs.tagsPageOpened;
                    this.refsTag.forEach((item, index) => {
                        if (route.name === item.$attrs["data-route-item"].name) {
                            let tag = this.refsTag[index].$el;
                            this.moveToView(tag);
                        }
                    });
                });
            },
            moveToView(tag) {
                const outerWidth = this.$refs.scrollOuter.offsetWidth;
                const bodyWidth = this.$refs.scrollBody.offsetWidth;
                if (bodyWidth < outerWidth) {
                    this.tagBodyLeft = 0;
                } else if (tag.offsetLeft < -this.tagBodyLeft) {
                    // 标签在可视区域左侧
                    this.tagBodyLeft = -tag.offsetLeft + this.outerPadding;
                } else if (
                    tag.offsetLeft > -this.tagBodyLeft &&
                    tag.offsetLeft + tag.offsetWidth <
                        -this.tagBodyLeft + outerWidth
                ) {
                    // 标签在可视区域
                    this.tagBodyLeft = Math.min(
                        0,
                        outerWidth -
                            tag.offsetWidth -
                            tag.offsetLeft -
                            this.outerPadding
                    );
                } else {
                    // 标签在可视区域右侧
                    this.tagBodyLeft = -(
                        tag.offsetLeft -
                        (outerWidth - this.outerPadding - tag.offsetWidth)
                    );
                }
            }
        },
        watch: {
            list() {
                sessionStorage.setItem("personList", JSON.stringify(this.list));
            },
            $route(to) {
                if (this.judgePath(to.name)) {
                    this.list.push(this.getListVal(to));
                }
                this.getTagElementByRoute(to);
            }
        }
    };
</script>

<style lang="less" scoped>
.no-select {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
.size {
    width: 100%;
    height: 100%;
}
.tags-nav {
    position: relative;
    border-top: 1px solid #f0f0f0;
    border-bottom: 1px solid #f0f0f0;
    height: 42px !important;
    .no-select;
    .size;
    .close-con {
        position: absolute;
        right: 0;
        top: 0;
        height: 100%;
        width: 32px;
        background: #fff;
        text-align: center;
        z-index: 10;
    }
    .btn-con {
        position: absolute;
        top: 0px;
        height: 100%;
        background: #fff;
        padding-top: 3px;
        z-index: 10;
        button {
            padding: 6px 4px;
            line-height: 14px;
            text-align: center;
        }
        &.left-btn {
            left: 0px;
        }
        &.right-btn {
            right: 32px;
            border-right: 1px solid #f0f0f0;
        }
    }
    .scroll-outer {
        position: absolute;
        left: 28px;
        right: 61px;
        top: 0;
        bottom: 0;
        box-shadow: 0px 0 3px 2px rgba(100, 100, 100, 0.1) inset;
        .scroll-body {
            height: ~"calc(100% - 1px)";
            display: inline-block;
            padding: 1px 4px 0;
            position: absolute;
            overflow: visible;
            white-space: nowrap;
            transition: left 0.3s ease;
            .ivu-tag-dot-inner {
                transition: background 0.2s ease;
            }
        }
    }
    .contextmenu {
        position: absolute;
        margin: 0;
        padding: 5px 0;
        background: #fff;
        z-index: 1000;
        list-style-type: none;
        border-radius: 4px;
        box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.1);
        li {
            margin: 0;
            padding: 5px 15px;
            cursor: pointer;
            &:hover {
                background: #eee;
            }
        }
    }
}
</style>
