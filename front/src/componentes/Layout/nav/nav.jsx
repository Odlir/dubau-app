import React, { useState } from "react";
import Profile_tres from "../../../assets/images/profile-3.jpg";
import Profile_cuatro from "../../../assets/images/profile-4.jpg";
import Profile_dos from "../../../assets/images/profile-2.jpg";
import Profile_cinco from "../../../assets/images/profile-5.jpg";
import Preview_cuatro from "../../../assets/images/preview-4.jpg";
import Preview_catorce from "../../../assets/images/preview-14.jpg";
import Preview_nueve from "../../../assets/images/preview-9.jpg";
import Preview_quince from "../../../assets/images/preview-15.jpg";
import Profile_nueve from "../../../assets/images/profile-9.jpg";
import Profile_seis from "../../../assets/images/profile-6.jpg";
import logo from "../../../assets/images/logo.svg";


class Sidebar_mobile extends React.Component {
  render() {
    return(
  
        <div className="top-bar-boxed h-[70px] md:h-[65px] z-[51] border-b border-white/[0.08] mt-12 md:mt-0 -mx-3 sm:-mx-8 md:-mx-0 px-3 md:border-b-0 relative md:fixed md:inset-x-0 md:top-0 sm:px-8 md:px-10 md:pt-10 md:bg-gradient-to-b md:from-slate-100 md:to-transparent dark:md:from-darkmode-700">
            <div className="h-full flex items-center">
                
                {/* <!-- BEGIN: Logo --> */}
                <a href="" className="logo -intro-x hidden md:flex xl:w-[180px] block">
                    <img alt="Midone - HTML Admin Template" className="logo__image w-6" src={logo}/>
                    <span className="logo__text text-white text-lg ml-3"> Enigma </span> 
                </a>
                
                {/* <!-- END: Logo --> */}
                {/* <!-- BEGIN: Breadcrumb --> */}               
                <nav aria-label="breadcrumb" className="-intro-x h-[45px] mr-auto">
                    <ol className="breadcrumb breadcrumb-light">
                        <li className="breadcrumb-item"><a href="#">Application</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Dashboard</li>
                    </ol>
                </nav>
                {/* <!-- END: Breadcrumb --> */}               
                
                {/* <!-- BEGIN: Search --> */}               
                <div className="intro-x relative mr-3 sm:mr-6">
                    <div className="search hidden sm:block">
                        <input type="text" className="search__input form-control border-transparent" placeholder="Search..."/>
                        <i data-lucide="search" className="search__icon dark:text-slate-500"></i> 
                    </div>
                    <a className="notification notification--light sm:hidden" href=""> <i data-lucide="search" className="notification__icon dark:text-slate-500"></i> </a>
                    <div className="search-result">
                        <div className="search-result__content">
                            <div className="search-result__content__title">Pages</div>
                            <div className="mb-5">
                                <a href="" className="flex items-center">
                                    <div className="w-8 h-8 bg-success/20 dark:bg-success/10 text-success flex items-center justify-center rounded-full"> <i className="w-4 h-4" data-lucide="inbox"></i> </div>
                                    <div className="ml-3">Mail Settings</div>
                                </a>
                                <a href="" className="flex items-center mt-2">
                                    <div className="w-8 h-8 bg-pending/10 text-pending flex items-center justify-center rounded-full"> <i className="w-4 h-4" data-lucide="users"></i> </div>
                                    <div className="ml-3">Users & Permissions</div>
                                </a>
                                <a href="" className="flex items-center mt-2">
                                    <div className="w-8 h-8 bg-primary/10 dark:bg-primary/20 text-primary/80 flex items-center justify-center rounded-full"> <i className="w-4 h-4" data-lucide="credit-card"></i> </div>
                                    <div className="ml-3">Transactions Report</div>
                                </a>
                            </div>
                            <div className="search-result__content__title">Users</div>
                            <div className="mb-5">
                                <a href="" className="flex items-center mt-2">
                                    <div className="w-8 h-8 image-fit">
                                        <img alt="Midone - HTML Admin Template" className="rounded-full" src={Profile_tres}/>
                                    </div>
                                    <div className="ml-3">Al Pacino</div>
                                    <div className="ml-auto w-48 truncate text-slate-500 text-xs text-right">alpacino@left4code.com</div>
                                </a>
                                <a href="" className="flex items-center mt-2">
                                    <div className="w-8 h-8 image-fit">
                                        <img alt="Midone - HTML Admin Template" className="rounded-full" src={Profile_cuatro}/>
                                    </div>
                                    <div className="ml-3">Sean Connery</div>
                                    <div className="ml-auto w-48 truncate text-slate-500 text-xs text-right">seanconnery@left4code.com</div>
                                </a>
                                <a href="" className="flex items-center mt-2">
                                    <div className="w-8 h-8 image-fit">
                                        <img alt="Midone - HTML Admin Template" className="rounded-full" src={Profile_dos}/>
                                    </div>
                                    <div className="ml-3">Johnny Depp</div>
                                    <div className="ml-auto w-48 truncate text-slate-500 text-xs text-right">johnnydepp@left4code.com</div>
                                </a>
                                <a href="" className="flex items-center mt-2">
                                    <div className="w-8 h-8 image-fit">
                                        <img alt="Midone - HTML Admin Template" className="rounded-full" src={Profile_cinco}/>
                                    </div>
                                    <div className="ml-3">Russell Crowe</div>
                                    <div className="ml-auto w-48 truncate text-slate-500 text-xs text-right">russellcrowe@left4code.com</div>
                                </a>
                            </div>
                            <div className="search-result__content__title">Products</div>
                            <a href="" className="flex items-center mt-2">
                                <div className="w-8 h-8 image-fit">
                                    <img alt="Midone - HTML Admin Template" className="rounded-full" src={Preview_cuatro}/>
                                </div>
                                <div className="ml-3">Sony A7 III</div>
                                <div className="ml-auto w-48 truncate text-slate-500 text-xs text-right">Photography</div>
                            </a>
                            <a href="" className="flex items-center mt-2">
                                <div className="w-8 h-8 image-fit">
                                    <img alt="Midone - HTML Admin Template" className="rounded-full" src={Preview_catorce}/>
                                </div>
                                <div className="ml-3">Nikon Z6</div>
                                <div className="ml-auto w-48 truncate text-slate-500 text-xs text-right">Photography</div>
                            </a>
                            <a href="" className="flex items-center mt-2">
                                <div className="w-8 h-8 image-fit">
                                    <img alt="Midone - HTML Admin Template" className="rounded-full" src={Preview_nueve}/>
                                </div>
                                <div className="ml-3">Sony A7 III</div>
                                <div className="ml-auto w-48 truncate text-slate-500 text-xs text-right">Photography</div>
                            </a>
                            <a href="" className="flex items-center mt-2">
                                <div className="w-8 h-8 image-fit">
                                    <img alt="Midone - HTML Admin Template" className="rounded-full" src={Preview_quince}/>
                                </div>
                                <div className="ml-3">Samsung Galaxy S20 Ultra</div>
                                <div className="ml-auto w-48 truncate text-slate-500 text-xs text-right">Smartphone &amp; Tablet</div>
                            </a>
                        </div>
                    </div>
                </div>
                {/* <!-- END: Search --> */}      


                {/* <!-- BEGIN: Notifications  --> */}               
                <div className="intro-x dropdown mr-4 sm:mr-6">
                    <div className="dropdown-toggle notification notification--bullet cursor-pointer" role="button" aria-expanded="false" data-tw-toggle="dropdown"> <i data-lucide="bell" className="notification__icon dark:text-slate-500"></i> </div>
                    <div className="notification-content pt-2 dropdown-menu">
                        <div className="notification-content__box dropdown-content">
                            <div className="notification-content__title">Notifications</div>
                            <div className="cursor-pointer relative flex items-center ">
                                <div className="w-12 h-12 flex-none image-fit mr-1">
                                    <img alt="Midone - HTML Admin Template" className="rounded-full" src={Profile_tres}/>
                                    <div className="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white"></div>
                                </div>
                                <div className="ml-2 overflow-hidden">
                                    <div className="flex items-center">
                                        <a href="javascript" className="font-medium truncate mr-5">Al Pacino</a> 
                                        <div className="text-xs text-slate-400 ml-auto whitespace-nowrap">01:10 PM</div>
                                    </div>
                                    <div className="w-full truncate text-slate-500 mt-0.5">Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 20</div>
                                </div>
                            </div>
                            <div className="cursor-pointer relative flex items-center mt-5">
                                <div className="w-12 h-12 flex-none image-fit mr-1">
                                    <img alt="Midone - HTML Admin Template" className="rounded-full" src={Profile_cuatro}/>
                                    <div className="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white"></div>
                                </div>
                                <div className="ml-2 overflow-hidden">
                                    <div className="flex items-center">
                                        <a href="javascript" className="font-medium truncate mr-5">Sean Connery</a> 
                                        <div className="text-xs text-slate-400 ml-auto whitespace-nowrap">01:10 PM</div>
                                    </div>
                                    <div className="w-full truncate text-slate-500 mt-0.5">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem </div>
                                </div>
                            </div>
                            <div className="cursor-pointer relative flex items-center mt-5">
                                <div className="w-12 h-12 flex-none image-fit mr-1">
                                    <img alt="Midone - HTML Admin Template" className="rounded-full" src={Profile_dos}/>
                                    <div className="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white"></div>
                                </div>
                                <div className="ml-2 overflow-hidden">
                                    <div className="flex items-center">
                                        <a href="javascript" className="font-medium truncate mr-5">Johnny Depp</a> 
                                        <div className="text-xs text-slate-400 ml-auto whitespace-nowrap">01:10 PM</div>
                                    </div>
                                    <div className="w-full truncate text-slate-500 mt-0.5">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#039;s standard dummy text ever since the 1500</div>
                                </div>
                            </div>
                            <div className="cursor-pointer relative flex items-center mt-5">
                                <div className="w-12 h-12 flex-none image-fit mr-1">
                                    <img alt="Midone - HTML Admin Template" className="rounded-full" src={Profile_cinco}/>
                                    <div className="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white"></div>
                                </div>
                                <div className="ml-2 overflow-hidden">
                                    <div className="flex items-center">
                                        <a href="javascript" className="font-medium truncate mr-5">Russell Crowe</a> 
                                        <div className="text-xs text-slate-400 ml-auto whitespace-nowrap">05:09 AM</div>
                                    </div>
                                    <div className="w-full truncate text-slate-500 mt-0.5">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem </div>
                                </div>
                            </div>
                            <div className="cursor-pointer relative flex items-center mt-5">
                                <div className="w-12 h-12 flex-none image-fit mr-1">
                                    <img alt="Midone - HTML Admin Template" className="rounded-full" src={Profile_nueve}/>
                                    <div className="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white"></div>
                                </div>
                                <div className="ml-2 overflow-hidden">
                                    <div className="flex items-center">
                                        <a href="javascript" className="font-medium truncate mr-5">Kevin Spacey</a> 
                                        <div className="text-xs text-slate-400 ml-auto whitespace-nowrap">01:10 PM</div>
                                    </div>
                                    <div className="w-full truncate text-slate-500 mt-0.5">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#039;s standard dummy text ever since the 1500</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- END: Notifications  --> */}          

                {/* <!-- BEGIN: Account Menu   --> */}               
                <div className="intro-x dropdown w-8 h-8">
                    <div className="dropdown-toggle w-8 h-8 rounded-full overflow-hidden shadow-lg image-fit zoom-in scale-110" role="button" aria-expanded="false" data-tw-toggle="dropdown">
                        <img alt="Midone - HTML Admin Template" src={Profile_seis}/>
                    </div>
                    <div className="dropdown-menu w-56">
                        <ul className="dropdown-content bg-primary/80 before:block before:absolute before:bg-black before:inset-0 before:rounded-md before:z-[-1] text-white">
                            <li className="p-2">
                                <div className="font-medium">Al Pacino</div>
                                <div className="text-xs text-white/60 mt-0.5 dark:text-slate-500">DevOps Engineer</div>
                            </li>
                            <li>
                                <hr className="dropdown-divider border-white/[0.08]"/>
                            </li>
                            <li>
                                <a href="" className="dropdown-item hover:bg-white/5"> <i data-lucide="user" className="w-4 h-4 mr-2"></i> Profile </a>
                            </li>
                            <li>
                                <a href="" className="dropdown-item hover:bg-white/5"> <i data-lucide="edit" className="w-4 h-4 mr-2"></i> Add Account </a>
                            </li>
                            <li>
                                <a href="" className="dropdown-item hover:bg-white/5"> <i data-lucide="lock" className="w-4 h-4 mr-2"></i> Reset Password </a>
                            </li>
                            <li>
                                <a href="" className="dropdown-item hover:bg-white/5"> <i data-lucide="help-circle" className="w-4 h-4 mr-2"></i> Help </a>
                            </li>
                            <li>
                                <hr className="dropdown-divider border-white/[0.08]"/>
                            </li>
                            <li>
                                <a href="" className="dropdown-item hover:bg-white/5"> <i data-lucide="toggle-right" className="w-4 h-4 mr-2"></i> Logout </a>
                            </li>
                        </ul>
                    </div>
                </div>
                {/* <!-- END: Account Menu   --> */}               

            </div>
        </div>

    );
  }
}
export default Sidebar_mobile;