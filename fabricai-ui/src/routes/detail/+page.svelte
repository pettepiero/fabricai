<script>
	import Navigation from '$lib/components/Navigation.svelte';
</script>

<Navigation />
<div>
	<!-- Image -->
	<div>
		<img src="https://via.placeholder.com/1080x1080" alt="Fabricai" />
	</div>
	<!-- Content-->
	<div class="text-center px-4">
		<div class="mt-8 text-xl font-bold uppercase">
			Fabric<span class="text-primary-500">ai</span>
		</div>
		<div class="mt-2 px-2 text-2xl font-semibold">Floral and Butterfly Skirt</div>

		<div class="px-2 mt-8 text-lg text-gray-600 font-mono">
			I want a skirt with a pattern of flowers and butterflies
		</div>

		<!-- Description -->
		<div class="mt-8 border-2 rounded-3xl p-4">
			<div class="text-lg font-semibold">Description</div>
			<div class="mt-2 text-gray-600">A skirt with a pattern of flowers and butterflies</div>
		</div>

		<!-- Suggested Materials -->
		<div class="mt-8 bg-yellow-100 p-4 rounded-3xl">
			<h2 class="text-lg font-bold mb-4">Materials used</h2>
			<ul class="list-disc pl-6">
				<li>Floral pattern fabric</li>
				<li>Butterfly pattern fabric</li>
				<li>Skirt pattern</li>
			</ul>
		</div>

		<!-- Pattern images -->
		<div class="mt-8 bg-yellow-100 p-4 rounded-3xl">
			<h2 class="text-left text-lg font-bold mb-4">Patterns</h2>
			<div class="grid grid-cols-3 space-x-1">
				<div class="" style="background-image: url(\"https://via.placeholder.com/300x300\")"></div>
				<div class="" style="background-image: url(https://via.placeholder.com/300x300)"></div>
				<div class="" style="background-image: url(https://via.placeholder.com/300x300)"></div>
			</div>
		</div>

		<!-- Environments to use -->

		<!-- Cost/Time -->

		<!-- Suggestions -->
	</div>
</div>
