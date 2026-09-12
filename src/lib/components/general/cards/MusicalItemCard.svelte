<script lang="ts">
	// Props
    export let item: {
        icon: typeof import('svelte').SvelteComponent;
        title: string;
        description: string[];
        buttonContent: string;
    };
</script>

<article
    class="border-s-border bg-s-secondary mx-auto flex w-full max-w-2xl flex-col space-y-6 rounded-lg border px-5 py-6 shadow-sm transition-shadow duration-300 hover:shadow-md sm:px-7 sm:py-6 lg:space-y-7 lg:px-8 lg:py-6.5"
>
    <h3 class="heading-3-musical-items flex flex-wrap items-center gap-3">
        <svelte:component
            this={item.icon}
            iconSvgClass="h-12 w-12 shrink-0 rounded-full bg-brand-primary p-2.5 text-t-inverse sm:h-14 sm:w-14"
        />

        <span>{item.title}</span>
    </h3>

    <ul class="space-y-4 text-t-secondary sm:space-y-5">
        {#each item.description as description}
            <li class="flex gap-3 leading-relaxed">
                <span
                    class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-primary"
                ></span>

                <span class="min-w-0">{description}</span>
            </li>
        {/each}
    </ul>

    <a
        class="button-cta mt-2.5 w-full"
        href="/my-musical-profile"
    >
        {item.buttonContent}
    </a>
</article>
