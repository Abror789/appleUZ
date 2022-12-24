import React from 'react';

const Footer = () => {
    return (
        <footer>
            <div className={"container"}>
                <div className={"row"}>
                    <div>
                        <h6>Sotib ol</h6>
                        <ul>
                            <li><a href='/'>Mac</a></li>
                            <li><a href='/'>iPad</a></li>
                            <li><a href='/'>iPhone</a></li>
                        </ul>
                    </div>
                    <div>
                        <h6>Kompaniya</h6>
                        <ul>
                            <li><a href='/'>Yangiliklar</a></li>
                            <li><a href='/'>Kompaniya haqida</a></li>
                            <li><a href='/'>Do'kon manzillari</a></li>
                            <li><a href='/'>Biznes uchun</a></li>
                        </ul>
                    </div>
                    <div>
                        <h6>Ma'lumot</h6>
                        <ul>
                            <li><a href='/'>Siz uchun sotib beramiz!</a></li>
                            <li><a href='/'>Muddatli to'lov</a></li>
                            <li><a href='/'>Yetkazib berish</a></li>
                            <li><a href='/'>Aloqa</a></li>
                            <li><a href='/'>Taklif bildirish</a></li>
                            <li><a href='/'>Siz taklif qilinasiz</a></li>
                        </ul>
                    </div>
                    <div>
                        <h6>Biz bilan bog'laning</h6>
                        <ul>
                            <li><a href='#'><svg width="24" height="24" className="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2m13 2h-2.5A3.5 3.5 0 0 0 12 8.5V11h-2v3h2v7h3v-7h3v-3h-3V9a1 1 0 0 1 1-1h2V5z"></path></svg></a></li>
                            <li><a href='#'><svg width="24" height="24" className="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path></svg></a></li>
                            <li><a href='#'><svg width="24" height="24" className="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z"></path></svg></a></li>
                            <li><a href='#'><svg width="24" height="24" className="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z"></path></svg></a></li>
                            <li><a href='#'><svg width="24" height="24" className="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path d="M12.4042 3.01519C13.4085 3 14.4071 3.009 15.4044 3C15.4649 4.14812 15.8873 5.31762 16.7471 6.12935C17.6052 6.96134 18.819 7.34217 20 7.47099V10.4912C18.8933 10.4558 17.7814 10.2308 16.7771 9.76499C16.3397 9.57148 15.9322 9.32227 15.5334 9.06745C15.5282 11.2591 15.5426 13.4479 15.519 15.6305C15.4591 16.679 15.1052 17.7225 14.4813 18.5866C13.4776 20.025 11.7355 20.9627 9.94619 20.992C8.84867 21.0533 7.7523 20.7608 6.81707 20.2219C5.26719 19.3286 4.17657 17.6933 4.01773 15.9382C3.99772 15.5665 3.99465 15.1941 4.00852 14.8221C4.14664 13.395 4.86893 12.0297 5.99004 11.101C7.2608 10.0192 9.04089 9.50397 10.7076 9.80886C10.7231 10.9199 10.6777 12.0297 10.6777 13.1407C9.91626 12.9 9.0265 12.9675 8.3612 13.4192C7.87445 13.7326 7.50661 14.1937 7.31432 14.7316C7.15548 15.1118 7.20094 15.5343 7.21015 15.9382C7.39259 17.169 8.60349 18.2035 9.89612 18.0916C10.7531 18.0826 11.5743 17.5965 12.0209 16.8849C12.1654 16.6357 12.3271 16.3809 12.3358 16.0878C12.4112 14.7462 12.3812 13.4102 12.3904 12.0685C12.3968 9.04495 12.3812 6.02979 12.4048 3.01575L12.4042 3.01519Z" fill="#515154"></path></svg></a></li>
                        </ul>
                        <p>+998 78 777 20 20</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
