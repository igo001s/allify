<script lang="ts">
	// Props
	export let userName: string | undefined;
	export let additionalClassesToSize: string;
</script>

<div
	class={`${additionalClassesToSize} flex items-center justify-center rounded-full border object-cover p-1 pt-1 font-medium text-brand-primary`}
>
	{userName ? userName.charAt(0).toUpperCase() : 'A'}
</div>
