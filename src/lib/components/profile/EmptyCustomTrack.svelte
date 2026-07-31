<script lang="ts">
    // Assets
    import SelectMusicIcon from '$lib/assets/images/icons/SelectMusicIcon.svelte';

    // Stores
    import { translationsStore } from '$lib/stores/translations.store';
    import { userInfo } from '$lib/stores/userInfo.store';

    // Props
    export let openSelectCustomItemModal: (itemType: 'music') => void;
</script>

<div class="flex w-full flex-col gap-3 sm:gap-4 xl:w-1/3">
    <h3 class="truncate text-xs font-semibold tracking-[0.18em] text-t-secondary uppercase">
        {#if $userInfo?.customTrack?.title}
            {$userInfo?.customTrack?.title}
        {:else}
            {$translationsStore.profilePage.profilePageEmptyCustomMusicHeading1}
        {/if}
    </h3>

    <button
        class="flex h-full cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-b-default p-5 text-t-primary shadow-xl sm:p-6 md:min-h-56 md:max-h-56"
        on:click={() => openSelectCustomItemModal('music')}
    >
        <div class="flex h-16 w-16 items-center justify-center rounded-full bg-s-muted sm:h-20 sm:w-20">
            <SelectMusicIcon
                iconSvgClass="ml-1.5 h-8 w-8 sm:h-10 sm:w-10"
                iconAltText={$translationsStore.profilePage.profilePageEmptyCustomMusicAltText}
            />
        </div>

        <div class="max-w-[16rem] text-center sm:max-w-xs">
            <h4 class="font-semibold">
                {$translationsStore.profilePage.profilePageEmptyCustomMusicHeading2}
            </h4>

            <p class="mt-1 text-xs leading-relaxed text-t-secondary">
                {$translationsStore.profilePage.profilePageEmptyCustomMusicParagraph1}
            </p>
        </div>
    </button>
</div>
