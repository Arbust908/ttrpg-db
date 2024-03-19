<script setup lang="ts">
import { defineComponent, h, ref } from 'vue'
import { Dialog, DialogPanel } from '@headlessui/vue'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'

definePageMeta({
  layout: 'empty',
})

const navigation = [
  /* { name: 'Product', href: '#' },
  { name: 'Features', href: '#' },
  { name: 'Resources', href: '#' },
  { name: 'Company', href: '#' }, */
]
const stats = [
  {
    label: 'TTRPGs in Database',
    value: '+100',
  },
  {
    label: 'Registered Users',
    value: '+85',
  },
  {
    label: 'Monthly Active Users',
    value: '+67',
  },
]
const values = [
  /*  {
    name: 'Be world-class',
    description:
        'Aut illo quae. Ut et harum ea animi natus. Culpa maiores et sed sint et magnam exercitationem quia. Ullam voluptas nihil vitae dicta molestiae et. Aliquid velit porro vero.',
  },
  {
    name: 'Share everything you know',
    description:
        'Mollitia delectus a omnis. Quae velit aliquid. Qui nulla maxime adipisci illo id molestiae. Cumque cum ut minus rerum architecto magnam consequatur. Quia quaerat minima.',
  },
  {
    name: 'Always learning',
    description:
        'Aut repellendus et officiis dolor possimus. Deserunt velit quasi sunt fuga error labore quia ipsum. Commodi autem voluptatem nam. Quos voluptatem totam.',
  },
  {
    name: 'Be supportive',
    description:
        'Magnam provident veritatis odit. Vitae eligendi repellat non. Eum fugit impedit veritatis ducimus. Non qui aspernatur laudantium modi. Praesentium rerum error deserunt harum.',
  },
  {
    name: 'Take responsibility',
    description:
        'Sit minus expedita quam in ullam molestiae dignissimos in harum. Tenetur dolorem iure. Non nesciunt dolorem veniam necessitatibus laboriosam voluptas perspiciatis error.',
  },
  {
    name: 'Enjoy downtime',
    description:
        'Ipsa in earum deserunt aut. Quos minus aut animi et soluta. Ipsum dicta ut quia eius. Possimus reprehenderit iste aspernatur ut est velit consequatur distinctio.',
  }, */
]
const team = [
  /*  {
    name: 'Michael Foster',
    role: 'Co-Founder / CTO',
    imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
  },
  // More people... */
]
const blogPosts = [
  /*  {
    id: 1,
    title: 'Vel expedita assumenda placeat aut nisi optio voluptates quas',
    href: '#',
    description:
        'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
    imageUrl:
        'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80',
    date: 'Mar 16, 2020',
    datetime: '2020-03-16',
    author: {
      name: 'Michael Foster',
      imageUrl:
          'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  }, */
  // More posts...
]
const footerNavigation = {
  main: [
    /* { name: 'Blog', href: '#' },
    { name: 'Jobs', href: '#' },
    { name: 'Press', href: '#' },
    { name: 'Accessibility', href: '#' },
    { name: 'Partners', href: '#' }, */
  ],
  social: [
    /*  {
      name: 'Facebook',
      href: '#',
      icon: defineComponent({
        render: () =>
          h('svg', { fill: 'currentColor', viewBox: '0 0 24 24' }, [
            h('path', {
              'fill-rule': 'evenodd',
              'd': 'M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z',
              'clip-rule': 'evenodd',
            }),
          ]),
      }),
    },
    {
      name: 'Instagram',
      href: '#',
      icon: defineComponent({
        render: () =>
          h('svg', { fill: 'currentColor', viewBox: '0 0 24 24' }, [
            h('path', {
              'fill-rule': 'evenodd',
              'd': 'M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z',
              'clip-rule': 'evenodd',
            }),
          ]),
      }),
    },
    {
      name: 'X',
      href: '#',
      icon: defineComponent({
        render: () =>
          h('svg', { fill: 'currentColor', viewBox: '0 0 24 24' }, [
            h('path', {
              d: 'M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z',
            }),
          ]),
      }),
    },
    {
      name: 'GitHub',
      href: '#',
      icon: defineComponent({
        render: () =>
          h('svg', { fill: 'currentColor', viewBox: '0 0 24 24' }, [
            h('path', {
              'fill-rule': 'evenodd',
              'd': 'M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z',
              'clip-rule': 'evenodd',
            }),
          ]),
      }),
    },
    {
      name: 'YouTube',
      href: '#',
      icon: defineComponent({
        render: () =>
          h('svg', { fill: 'currentColor', viewBox: '0 0 24 24' }, [
            h('path', {
              'fill-rule': 'evenodd',
              'd': 'M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z',
              'clip-rule': 'evenodd',
            }),
          ]),
      }),
    },
    */
  ],
}

const mobileMenuOpen = ref(false)
</script>

<template>
  <div class="bg-white">
    <!-- Header -->
    <header class="absolute inset-x-0 top-0 z-50">
      <nav class="mx-auto max-w-7xl flex items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div class="flex lg:flex-1">
          <NuxtLink to="/" class="p-1.5 -m-1.5">
            <span class="sr-only">The TTRPG Data Base</span>
            <img class="h-12 w-auto" src="/favicon_light.png" alt="The TTRPG Data Base">
          </NuxtLink>
        </div>
        <div class="flex lg:hidden">
          <button type="button" class="inline-flex items-center justify-center rounded-md p-2.5 text-slate-700 -m-2.5" @click="mobileMenuOpen = true">
            <span class="sr-only">Open main menu</span>
            <Bars3Icon class="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div class="hidden lg:flex lg:gap-x-12">
          <a v-for="item in navigation" :key="item.name" :href="item.href" class="text-sm text-slate-900 font-semibold leading-6">{{ item.name }}</a>
        </div>
        <div class="hidden lg:flex lg:flex-1 lg:justify-end">
          <NuxtLink to="/login" class="text-sm text-slate-900 font-semibold leading-6">
            Register <span aria-hidden="true">&rarr;</span>
          </NuxtLink>
        </div>
      </nav>
      <Dialog as="div" class="lg:hidden" :open="mobileMenuOpen" @close="mobileMenuOpen = false">
        <div class="fixed inset-0 z-50" />
        <DialogPanel class="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-slate-900/10">
          <div class="flex items-center justify-between">
            <a href="#" class="p-1.5 -m-1.5">
              <span class="sr-only">The TTRPG Data Base</span>
              <img class="h-10 w-auto" src="/favicon_light.png" alt="The TTRPG Data Base">
            </a>
            <button type="button" class="rounded-md p-2.5 text-slate-700 -m-2.5" @click="mobileMenuOpen = false">
              <span class="sr-only">Close menu</span>
              <XMarkIcon class="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div class="mt-6 flow-root">
            <div class="-my-6 divide-y divide-slate-500/10">
              <div class="py-6 space-y-2">
                <a v-for="item in navigation" :key="item.name" :href="item.href" class="block rounded-lg px-3 py-2 text-base text-slate-900 font-semibold leading-7 -mx-3 hover:bg-slate-50">{{ item.name }}</a>
              </div>
              <div class="py-6">
                <NuxtLink to="/login" class="block rounded-lg px-3 py-2.5 text-base text-slate-900 font-semibold leading-7 -mx-3 hover:bg-slate-50">
                  Register
                </NuxtLink>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>

    <main class="isolate">
      <!-- Hero section -->
      <div class="relative isolate -z-10">
        <svg class="[mask-image:radial-gradient(32rem_32rem_at_center,white,transparent)] absolute inset-x-0 top-0 h-[64rem] w-full stroke-slate-200 -z-10" aria-hidden="true">
          <defs>
            <pattern id="1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84" width="200" height="200" x="50%" y="-1" patternUnits="userSpaceOnUse">
              <path d="M.5 200V.5H200" fill="none" />
            </pattern>
          </defs>
          <svg x="50%" y="-1" class="overflow-visible fill-slate-50">
            <path d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z" stroke-width="0" />
          </svg>
          <rect width="100%" height="100%" stroke-width="0" fill="url(#1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84)" />
        </svg>
        <div class="absolute left-1/2 right-0 top-0 transform-gpu overflow-hidden blur-3xl -z-10 -ml-24 lg:ml-24 xl:ml-48" aria-hidden="true">
          <div class="aspect-[801/1036] w-[50.0625rem] from-[#ff80b5] to-[#9089fc] bg-gradient-to-tr opacity-30" style="clip-path: polygon(63.1% 29.5%, 100% 17.1%, 76.6% 3%, 48.4% 0%, 44.6% 4.7%, 54.5% 25.3%, 59.8% 49%, 55.2% 57.8%, 44.4% 57.2%, 27.8% 47.9%, 35.1% 81.5%, 0% 97.7%, 39.2% 100%, 35.2% 81.4%, 97.2% 52.8%, 63.1% 29.5%)" />
        </div>
        <div class="overflow-hidden">
          <div class="mx-auto max-w-7xl px-6 pb-32 pt-36 lg:px-8 lg:pt-32 sm:pt-60">
            <div class="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:max-w-none lg:flex lg:items-center">
              <div class="max-w-xl w-full xl:max-w-2xl lg:shrink-0">
                <h1 class="text-4xl text-slate-900 font-bold tracking-tight sm:text-6xl">
                  Unleashing the Ultimate TTRPG Database Experience
                </h1>
                <p class="relative mt-6 text-lg text-slate-600 leading-8 lg:max-w-none sm:max-w-md">
                  Get ready to embark on an epic journey like never before! We are crafting the most comprehensive and immersive database for tabletop role-playing games (TTRPGs) ever created.
                </p>
              </div>
              <div class="mt-14 flex justify-end gap-8 lg:mt-0 sm:justify-start lg:pl-0 sm:pl-20 sm:-mt-44">
                <div class="ml-auto w-44 flex-none pt-32 lg:order-last xl:order-none sm:ml-0 space-y-8 lg:pt-36 sm:pt-80 xl:pt-80">
                  <div class="relative">
                    <img src="~/assets/images/vampire.jpeg" alt="Cover art of Vampire the Masquerade 5e" class="w-full rounded bg-slate-900/5 object-cover shadow-lg">
                    <div class="pointer-events-none absolute inset-0 rounded ring-1 ring-slate-900/10 ring-inset" />
                  </div>
                </div>
                <div class="mr-auto w-44 flex-none sm:mr-0 space-y-8 lg:pt-36 sm:pt-52">
                  <div class="relative">
                    <img src="~/assets/images/coc.jpeg" alt="Cover art of Call of Chuthulu 7e" class="w-full rounded bg-slate-900/5 object-cover shadow-lg">
                    <div class="pointer-events-none absolute inset-0 rounded ring-1 ring-slate-900/10 ring-inset" />
                  </div>
                  <div class="relative">
                    <img src="~/assets/images/carin.png" alt="Cover art of Carin" class="w-full rounded bg-slate-900/5 object-cover shadow-lg">
                    <div class="pointer-events-none absolute inset-0 rounded ring-1 ring-slate-900/10 ring-inset" />
                  </div>
                </div>
                <div class="w-44 flex-none pt-32 space-y-8 sm:pt-0">
                  <div class="relative">
                    <img src="~/assets/images/pathfinder2e.jpeg" alt="Cover art of Pathfinder 2e" class="w-full rounded bg-slate-900/5 object-cover shadow-lg">
                    <div class="pointer-events-none absolute inset-0 rounded ring-1 ring-slate-900/10 ring-inset" />
                  </div>
                  <div class="relative">
                    <img src="~/assets/images/PHB5e.webp" alt="Cover art of Dungeons and Dragons 5e" class="w-full rounded bg-slate-900/5 object-cover shadow-lg">
                    <div class="pointer-events-none absolute inset-0 rounded ring-1 ring-slate-900/10 ring-inset" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Content section -->
      <div class="mx-auto max-w-7xl px-6 -mt-12 sm:mt-0 lg:px-8 xl:-mt-8">
        <div class="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
          <h2 class="text-3xl text-slate-900 font-bold tracking-tight sm:text-4xl">
            Our mission
          </h2>
          <div class="mt-6 flex flex-col gap-x-8 gap-y-20 lg:flex-row">
            <div class="lg:max-w-2xl lg:w-full lg:flex-auto">
              <p class="text-xl text-slate-600 leading-8">
                Our team of passionate TTRPG enthusiasts is working tirelessly to bring you an unparalleled resource that will redefine how you discover, explore, and engage with your favorite games. Whether you're a seasoned adventurer or a curious newcomer, our database will be your ultimate companion.
              </p>
            </div>
            <div class="max-w-xl text-base text-slate-700 leading-7 max-md:mt-10 space-y-6 md:text-sm">
              <p>
                Imagine a world where you can effortlessly search through a vast collection of TTRPGs, from classic favorites to hidden gems. Uncover games that match your preferred genre, setting, mechanics, and more, all at your fingertips. Dive into detailed game descriptions, explore player reviews, and connect with like-minded adventurers who share your passion.
              </p>
              <p>
                But we're not just building a database; we're creating a vibrant community hub for TTRPG lovers worldwide. Connect with fellow players, join discussions, and unlock a treasure trove of resources to enhance your gaming experiences.
              </p>
              <p>
                We are leaving no stone unturned in our quest to bring you the most comprehensive, user-friendly, and captivating TTRPG database ever created. Our team is pouring their hearts and souls into every aspect of this project, ensuring that every detail is crafted with the utmost care and precision.
              </p>
              <p>
                Get ready to embark on a new era of TTRPG discovery and adventure. Sign up for our exclusive newsletter to stay updated on our progress, sneak peeks, and the upcoming launch. Your ultimate TTRPG database experience is coming soon, and trust us, it will be worth the wait!
              </p>
              <p>
                Join us on this thrilling journey and prepare to unleash your imagination like never before. The future of TTRPGs is almost here, and we can't wait to share it with you!"
              </p>
            </div>
          </div>

          <dl class="grid grid-cols-1 mx-auto mt-24 gap-8 md:grid-cols-3 xl:mx-auto sm:mt-40 xl:max-w-7xl md:items-start md:justify-items-center">
            <div v-for="stat in stats" :key="stat.label" class="flex flex-col-reverse gap-y-2">
              <dt class="text-base text-slate-500 leading-7">
                {{ stat.label }}
              </dt>
              <dd class="text-5xl text-slate-800 font-semibold tracking-tight">
                {{ stat.value }}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </main>

    <!-- Image section -->
    <div class="mt-32 xl:mx-auto sm:mt-40 xl:max-w-7xl xl:px-8">
      <img src="~/assets/images/JeffBrown_GMINFLUENCE.jpg" alt="" class="aspect-[5/2] w-full object-cover object-top xl:rounded-3xl">
    </div>

    <!-- Footer -->
    <!-- <footer class="mx-auto mt-40 max-w-7xl overflow-hidden px-6 pb-20 sm:mt-64 lg:px-8 sm:pb-24">
      <nav class="columns-2 -mb-6 sm:flex sm:justify-center sm:space-x-12" aria-label="Footer">
        <div v-for="item in footerNavigation.main" :key="item.name" class="pb-6">
          <a :href="item.href" class="text-sm text-slate-600 leading-6 hover:text-slate-900">{{ item.name }}</a>
        </div>
      </nav>
      <div class="mt-10 flex justify-center space-x-10">
        <a v-for="item in footerNavigation.social" :key="item.name" :href="item.href" class="text-slate-400 hover:text-slate-500">
          <span class="sr-only">{{ item.name }}</span>
          <component :is="item.icon" class="h-6 w-6" aria-hidden="true" />
        </a>
      </div>
      <p class="mt-10 text-center text-xs text-slate-500 leading-5">
        &copy; 2020 Your Company, Inc. All rights reserved.
      </p>
    </footer> -->
  </div>
</template>
