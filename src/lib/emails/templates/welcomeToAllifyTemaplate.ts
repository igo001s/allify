// Svelte
import { get } from 'svelte/store';

// Stores
import { translationsStore } from '$lib/stores/translations.store';

export const welcomeToAllifyTemplate = (name: string, streaming: string) => {
	const $translationsStore = get(translationsStore);

	return `
<div style="
    background-color: #f9fafb;
    padding: 24px 12px;
    font-family:
        Montserrat,
        Arial,
        sans-serif;
">

    <div style="
        max-width: 500px;
        margin: 0 auto;
        background-color: #ffffff;
        border: 1px solid #d1d5db;
        border-radius: 20px;
        overflow: hidden;
        box-shadow: 0 4px 14px rgba(0,0,0,0.04);
    ">

        <div style="
            height: 5px;
            background-color: #09623a;
        "></div>

        <div style="
            padding: 40px 32px 48px;
        ">

            <table
                role="presentation"
                width="100%"
                cellspacing="0"
                cellpadding="0"
                style="margin-bottom: 40px;"
            >
                <tr>

                    <td
                        align="left"
                        valign="middle"
                        style="line-height: 0;"
                    >
                        <img
                            src="https://allify-sv.netlify.app/email-images/allify-logo.png"
                            alt="${$translationsStore.templateEmail.allifyLogoAltText}"
                            style="
                                height: 38px;
                                width: auto;
                                display: block;
                            "
                        />
                    </td>

                    <td
                        align="right"
                        valign="middle"
                        style="line-height: 0;"
                    >

                        ${
													streaming === 'Spotify'
														? `
                            <img
                                src="https://allify-sv.netlify.app/email-images/spotify-logo.png"
                                alt="${$translationsStore.templateEmail.spotifyLogoAltText}"
                                style="
                                    height: 26px;
                                    width: auto;
                                    display: block;
                                "
                            />
                        `
														: ''
												}

                        ${
													streaming === 'Deezer'
														? `
                            <img
                                src="https://allify-sv.netlify.app/email-images/deezer-logo.png"
                                alt="${$translationsStore.templateEmail.deezerLogoAltText}"
                                style="
                                    height: 26px;
                                    width: auto;
                                    display: block;
                                "
                            />
                        `
														: ''
												}

                    </td>

                </tr>
            </table>

            <h1 style="
                font-size: 30px;
                line-height: 1.2;
                font-weight: 700;
                color: #161616;
                margin: 0 0 24px;
            ">
                ${$translationsStore.templateEmail.welcomeToAllifyTitle} ${name}
            </h1>

            <p style="
                font-size: 16px;
                line-height: 1.8;
                color: #676767;
                margin: 0 0 18px;
            ">
                ${$translationsStore.templateEmail.welcomeToAllifyConnectedAccountText}

                <strong style="color: #161616;">
                    ${streaming}
                </strong>

                ${$translationsStore.templateEmail.welcomeToAllifyConnectedAccountSuccessText}
            </p>

            <p style="
                font-size: 16px;
                line-height: 1.8;
                color: #676767;
                margin: 0 0 36px;
            ">
                ${$translationsStore.templateEmail.welcomeToAllifyDescription}
            </p>

            <div style="text-align: center;">

                <a
                    href="https://allify-sv.netlify.app/my-musical-profile"
                    style="
                        display: inline-block;
                        background-color: #09623a;
                        color: #ffffff;
                        text-decoration: none;
                        padding: 15px 30px;
                        border-radius: 14px;
                        font-size: 14px;
                        font-weight: 600;
                        width: 100%;
                        max-width: 260px;
                        box-sizing: border-box;
                        text-align: center;
                    "
                >
                    ${$translationsStore.templateEmail.welcomeToAllifyButtonText}
                </a>

            </div>

        </div>

        <div style="
            background-color: #f3f4f6;
            border-top: 1px solid #d1d5db;
            padding: 28px 32px;
            text-align: center;
        ">

            <p style="
                font-size: 14px;
                line-height: 1.8;
                color: #6b7280;
                margin: 0 0 14px;
            ">
                ${$translationsStore.templateEmail.welcomeToAllifyNeedHelpText}

                <a
                    href="https://www.linkedin.com/in/igoraraujo01-dev/"
                    style="
                        color: #09623a;
                        text-decoration: none;
                        font-weight: 600;
                    "
                >
                    ${$translationsStore.templateEmail.welcomeToAllifyContactText}
                </a>
            </p>

            <p style="
                font-size: 13px;
                color: #9ca3af;
                margin: 0;
                line-height: 1.7;
            ">
                ${$translationsStore.templateEmail.welcomeToAllifyCopyrightText}
            </p>

        </div>

    </div>

</div>
`;
};
