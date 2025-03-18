document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('generation-form');
    const preview = document.getElementById('preview');
    const errorMessage = document.getElementById('error-message');
    const loading = document.getElementById('loading');
    const imagePreview = document.getElementById('image-preview');
    const backToSettings = document.getElementById('back-to-settings');

    const settings = {
        style: 'artistic',
        backgroundColor: 'studio',
        lighting: 'studio',
        pose: 'profile',
        aspectRatio: '4:5'
    };

    const settingsConfig = [
        { name: 'style', icon: 'palette', options: ['professional', 'artistic', 'casual', 'vintage'] },
        { name: 'backgroundColor', icon: 'image', options: ['studio', 'gradient', 'solid', 'transparent'] },
        { name: 'lighting', icon: 'sun', options: ['soft', 'dramatic', 'natural', 'studio'] },
        { name: 'pose', icon: 'user', options: ['headshot', 'half-body', 'full-body', 'profile'] },
    ];

    function createSettingsFields() {
        const settingsContainer = form.querySelector('.space-y-4');
        settingsConfig.forEach(setting => {
            const fieldHtml = `
                <div class="flex items-center justify-between gap-4">
                    <div class="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 text-zinc-500">
                            <path d="${getIconPath(setting.icon)}"></path>
                        </svg>
                        <span class="text-sm text-zinc-500">${capitalizeFirstLetter(setting.name)}</span>
                    </div>
                    <div class="select-wrapper">
                        <select name="${setting.name}" class="w-[140px] h-8 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 rounded-md text-sm">
                            ${setting.options.map(option => `<option value="${option}"${option === settings[setting.name] ? ' selected' : ''}>${capitalizeFirstLetter(option)}</option>`).join('')}
                        </select>
                    </div>
                </div>
            `;
            settingsContainer.insertAdjacentHTML('beforeend', fieldHtml);
        });
    }

    function getIconPath(icon) {
        switch (icon) {
            case 'palette': return 'M12 19a7 7 0 1 0 0-14 7 7 0 0 0 0 14Z';
            case 'image': return 'M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7m4 2v4m4-4-4 4m4 0-4-4';
            case 'sun': return 'M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364-.707-.707M6.343 6.343l-.707-.707m12.728 0-.707.707M6.343 17.657l-.707.707';
            case 'user': return 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z';
            default: return '';
        }
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    createSettingsFields();

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        form.style.display = 'none';
        preview.style.display = 'block';
        errorMessage.style.display = 'none';
        loading.style.display = 'flex';
        imagePreview.style.display = 'none';

        // Simulating API call
        setTimeout(() => {
            loading.style.display = 'none';
            imagePreview.style.display = 'flex';
            const img = imagePreview.querySelector('img');
            img.src = 'https://ferf1mheo22r9ira.public.blob.vercel-storage.com/profile-mjss82WnWBRO86MHHGxvJ2TVZuyrDv.jpeg';
        }, 3000);
    });

    backToSettings.addEventListener('click', function() {
        form.style.display = 'flex';
        preview.style.display = 'none';
    });

    // Create loading animation
    const loadingHtml = `
        <div class="w-full max-w-md border-0 shadow-none bg-transparent">
            <div class="flex flex-col items-center gap-4 p-6">
                <div class="relative w-12 h-12">
                    <svg class="w-full h-full animate-spin text-fuchsia-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <div class="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-fuchsia-500/10 rounded-full animate-spin-slow"></div>
                </div>
                <div class="space-y-1 text-center">
                    <p class="text-sm font-medium text-zinc-700 dark:text-zinc-300">Creating your masterpiece...</p>
                    <p class="text-xs text-zinc-500 dark:text-zinc-400">This usually takes 10-15 seconds</p>
                </div>
                <div class="w-full h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                    <div class="h-full bg-fuchsia-500 transition-all duration-300 ease-linear" style="width: 0%"></div>
                </div>
            </div>
        </div>
    `;
    loading.innerHTML = loadingHtml;

    // Simulate progress bar
    function simulateProgress() {
        const progressBar = loading.querySelector('.bg-fuchsia-500');
        let width = 0;
        const interval = setInterval(() => {
            if (width >= 100) {
                clearInterval(interval);
            } else {
                width++;
                progressBar.style.width = width + '%';
            }
        }, 30);
    }

    form.addEventListener('submit', simulateProgress);
});