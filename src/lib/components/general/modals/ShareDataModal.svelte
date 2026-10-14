<script lang="ts">
	// App
	import { dev } from '$app/environment';

	// Assets
	import DotsLoading from '#lib/assets/animations/DotsLoading.svelte';
	import AllifyLogoColorful from '#lib/assets/logos/AllifyLogoColorful.webp';

	// Components
	import Modal from './Modal.svelte';

	// Stores
	import { translationsStore } from '#lib/stores/translations.store';
	import { toastStore } from '#lib/stores/toast.store';

	// Types
	import type { ArtistItems } from '#lib/types/Artists.type';
	import type { TrackItems } from '#lib/types/Tracks.type';
	import type { ShareDataContent } from '#lib/types/Share.type';

	// Librarys
	import { toBlob } from 'html-to-image';

	// Props
	export let showShareDataModal: boolean;
	export let shareDataFrom: string;
	export let dataToShare: ArtistItems[] | TrackItems[];
	export let buildShareDataContent: ShareDataContent;

	let loadingShare = false;

	function getTopStyle(dataFrom: string, dataType: string, top: number): string {
		if (dataFrom === 'myMusicalProfile') {
			switch (top) {
				case 0:
					return 'text-top-1';
				case 1:
					return 'text-top-2';
				case 2:
					return 'text-top-3';
				default:
					return '';
			}
		}

		if (dataType !== 'customArtist' && dataType !== 'customTrack') {
			return 'uppercase';
		}

		return '';
	}

	async function handleShareData() {
		loadingShare = true;

		try {
			const element = document.getElementById('share-data-modal');

			if (!element) {
				throw new Error('Share data element not found.');
			}

			const blob = await toBlob(element, {
				cacheBust: true,
				pixelRatio: 3,
				backgroundColor: '#ffffff'
			});

			if (!blob) {
				throw new Error('Unable to generate the image.');
			}

			const file = new File([blob], buildShareDataContent.fileName, {
				type: 'image/png'
			});

			if (navigator.share && navigator.canShare?.({ files: [file] })) {
				await navigator.share({
					files: [file],
					title: buildShareDataContent.fileTitle,
					text: buildShareDataContent.fileText
				});
			}
		} catch (error) {
			if (dev) {
				console.error(`Error sharing data:`, error);
			}

			toastStore.set({
				showToast: true,
				toastType: 'error',
				toastMessage: buildShareDataContent.toastErrorMessage
			});
		} finally {
			setTimeout(() => {
				loadingShare = false;
			}, 2000);
		}
	}
</script>

<Modal
	closeModal={() => (showShareDataModal = false)}
	closeModalButtonAriaLabel={buildShareDataContent.shareDataCloseModalButtonAriaLabel}
	closeModalIconAriaLabel={buildShareDataContent.shareDataCloseModalIconAriaLabel}
	additionalClasses="h-fit w-full max-w-2xl overflow-y-auto"
>
	<div class="space-y-3">
		<p class="text-lg font-bold text-t-primary sm:text-xl">
			{buildShareDataContent.shareDataModalParagraph1}
		</p>

		<p class="text-xs text-t-secondary sm:text-sm">
			{buildShareDataContent.shareDataModalParagraph2}
		</p>
	</div>

	<div
		class="flex h-80 w-full justify-center overflow-y-auto border border-s-muted bg-s-muted px-6 py-4 sm:h-128 md:h-160"
	>
		<div class="h-fit w-110 origin-top zoom-70 sm:zoom-80 md:zoom-100">
			<div
				id="share-data-modal"
				class="flex min-h-160 w-110 flex-col items-center justify-between bg-s-default px-10 py-12 text-t-primary shadow-lg"
			>
				<header class="flex w-full items-center justify-between gap-2">
					<img
						src={AllifyLogoColorful}
						alt={$translationsStore.generalTexts.logoColorfulAltText}
						class="h-auto w-[28%]"
						loading="eager"
						decoding="sync"
					/>

					<div class="space-y-1.5">
						<div class="flex items-center gap-2">
							<enhanced:img
								src={buildShareDataContent.shareDataModalUserImage}
								alt={buildShareDataContent.shareDataModalUserName}
								class="h-6 w-6 rounded-full"
							/>

							<span class="font-semibold">{buildShareDataContent.shareDataModalUserName}</span>
						</div>

						<span class="text-right text-xs font-semibold text-t-secondary">
							{buildShareDataContent.shareDataType}
						</span>
					</div>
				</header>

				<section class="w-full space-y-2">
					<p class="text-[13px] font-bold text-brand-primary">
						{buildShareDataContent.shareDataModalPreviewParagraph1}
					</p>

					<p class="text-2xl leading-tight font-bold text-t-primary">
						{buildShareDataContent.shareDataModalPreviewParagraph2}
					</p>

					<p class="text-[13px] leading-relaxed text-t-secondary">
						{buildShareDataContent.shareDataModalPreviewParagraph3}
					</p>

					<ul class="mt-7 flex h-fit flex-col gap-4">
						{#each dataToShare as data, i (i)}
							<li
								class="flex max-h-22 min-h-16 items-center gap-3 rounded-lg border border-b-default p-2.5"
							>
								{#if data.item.image}
									<img
										src={data.item.image}
										alt={data.item.name}
										class="size-12 shrink-0 rounded-lg object-cover"
										loading="eager"
										decoding="sync"
									/>
								{/if}

								<div class="min-w-0 flex-1 space-y-1">
									<p
										class={`${getTopStyle(shareDataFrom, data.type, i)} truncate text-xs font-semibold text-brand-primary`}
									>
										{data.title}
									</p>

									<p class="text-sm leading-snug font-semibold text-t-primary">
										{data.item.name}
									</p>
								</div>
							</li>
						{/each}
					</ul>
				</section>

				<footer
					class="flex w-full items-center justify-between gap-2 border-t border-b-default pt-8"
				>
					<span class="text-xs text-t-secondary">
						{$translationsStore.generalTexts.shareModalYourMusicYourIdentity}
					</span>

					<strong class="text-xs font-semibold text-brand-primary">allify.club</strong>
				</footer>
			</div>
		</div>
	</div>

	<div class="mt-2 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
		<button
			type="button"
			class="button-secondary h-9 px-6 py-2.5"
			on:click={() => (showShareDataModal = false)}
		>
			{$translationsStore.generalTexts.shareModalCancelButtonText}
		</button>

		<button
			type="button"
			class="button-primary h-9 w-full px-6 py-2.5 sm:w-30"
			on:click={handleShareData}
		>
			{#if loadingShare}
				<DotsLoading dotsTheme="base-light" />
			{:else}
				{$translationsStore.generalTexts.shareModalShareButtonText}
			{/if}
		</button>
	</div>
</Modal>
