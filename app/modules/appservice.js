import { topmost } from "ui/frame";

export function openPage(page, props={}) {
    topmost().currentPage.__vuePageRef__.$navigateTo(page, {
        transition: "slide",
        props: props
    });
}