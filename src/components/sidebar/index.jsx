import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { RxDashboard } from "react-icons/rx";
import { IoCameraOutline } from "react-icons/io5";
import { LuScanFace } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import { AiFillInfoCircle } from "react-icons/ai";

const Sidebar = () => {
  return (
    <div className="relative top-0 left-0 h-full w-64 shadow-lg overflow-y-auto">
    {/* Blurred Background Image */}
     <div
    className="absolute inset-0 bg-cover bg-center h-full w-full"
    style={{
  backgroundImage: "url('./image/sidebar.jpg')",
  filter: "blur(1.5px)",
}}
  />
    
    {/* Dark Overlay */}
    <div className="fixed inset-0 -z-10" />
      <div className=" fixed ml-[44px] mt-[-81px] p-4 ml-[2px]">
        <Link to="/">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGgAAAA0CAYAAABmUH0tAAAACXBIWXMAAAsSAAALEgHS3X78AAAGUklEQVR4nO2bP0wbVxzHP6Gc9SQGYPFqK9ChUxKRhQmfRCS8tFEqZ40noBJSURmc8bLBgEokpBSWwoqlNJlAwpKhC12seEsHk9qrhxAGlJMtlQ73HB2XO9t397Ddg69kwd2935/3fu/35957d+fy8pJ+Y7JYvA+M+SSrVnS9eg3qDBSG+63AZLGYBI6AUZ+kx0BKsToDh6F+KwAY+DcOwMxksZhVq8rg4U4/Q9xksZgCiiFY1ID7FV3/pEajwUO/PcgISZ8AlhXoMbDomwfJ8PS7AlbnWF5UVcBr4NAXD5osFscI7z0tjCrkNXDoV4hbxgpPqvBM5rPIoecGkmX1deQN4xp49h398CCDYGV1J0Sy7O5pkaCgrO6EyJXdvfYg45r5R67s7pmBZO653wNRvZDRM/TMQPI9ZaMHooweyOgZeh3iNrDyxHVht6Lr5Wvk33MoKRLWT+be0N12QfmVmSujZgXBiXMgGaUCARQYaP1kLou/AddfmTkDmAkl+Gu8qOi6oZhn3xEqxK2fzI3hP69soD5P1ALo8b9A2By0jP+Xzns/ibUksBtSth1G1EJbC4FD3PrJXBIoE2xVoPau8eT7v/799s+A9HYcV3Q9FZLHwCKMBxkEH9zEg9jrJ6gJS4YCHgOLQAZaP5lLAc9Cyl7+UXv7mnBl925F149C6jHQCOpBhgLZo/Fv/v4lBK9zRXoMNHznoABldSfor8xcFkj6pHtT0fVIVm52BDl2pXqtK1nR9axinpFBkBBnYIUXFaitTB/sKOIVSVzxoIvNRBLYaUewCBu/TX1nAL8qkJ9VwCPSuJKDLjYTR3RegqmNLNWS6ydzVcKdKzhemT5IhaC/EfgS4i42Eym6Wx9LXGwmDMLP/rD0NwL2HLTjg255sfS+jHU+OgherkwfVL0eakLkNCEuHb9T+Swjr+cdNBlNiEvb9aUmRM6Nr/z/VBNiz0X2qibERycPTYhxTYgtTYiP8v5H2zMvWae2tquaEONOfTv1YxjgYjPh9xjUKNYqQBb4xwcd+Ht/eWT7/0z+bXVyVRMi3zRN5/1ukQdyLvczQMHl/hYwCyxIXe4CJTfGmhCHwBTwHPgg265K+od++jF0sZkIeojw2WLp/Rjw0iedsTJ90NXCZtM0C7affTDO5G/Lp2w7CmDN2NYNTYhZrMHcdmmfAbabppmX+mw7dGrxyGEZ4pFsU2ia5jbWZJtyeFrHfgwRbk2ttXXQbdldW5k+UPFyOY41OzNyUH2jaZoFrMGx088CZ/KZEyUp724H1hnAOaGQ1wX5vIWO/RgGfu4gsB1mFkvvkyNLNb8fX3UFeyzG6vSXkNc0zbwmRAFr9k0EFJHHGrAFeZ2R99ywAOwBp1Lumochp4A1Dx4lHGG1Uz+GgbfAD+374YnayFKt3NiPL9Pdlnc1lq7v+ODvloPsWMAasFWsWO8XeWDeNnvv4mGgpmmWNCEeYhlxHjjUhFiQ4SssPPsxjLXpFtRA2cZ+/DE+Xlob+/FyLF3v6mCHxwy1P/+gCbGGNSufuzRxFg7j2AzdNM2CJoQ9zH1oJ1Mm8m1gWxYCq3ydr0pYXuSGKVwKi3b9GBpZqlWBF15KtcHxyFLtiGBb3srQNM1WpTTveOQ2UG4DVMAyULvw5oYS7pVjHpjVhLgiW17Pesnw6kdrqWcD/9vX2cZ+3MD/asJMYz/+OJauv+nU0Jk428zuBeDQcW8N2JNho2WEWa6GTbAGbM/2v5cue/J5q8Sex6Xaa5rmmqwMDzUhnGV2oWmaXvnJtR9DACNLtU/4OzL7Upv47JfGjm696ND+kxXUV7lIGi7vuJfH6nBG0meAp04jy3ZnWOHN672m5SlbklcOq+RecGuPNQm2sYzSar8GPLW16aofzrW4MnDPQ2gL50BSm/i8Qbhd1RexdN0IQX8j4DRQis4vrTvaxOcy8C6k7HMgGUvXI3kaRxUCnepp7MePUHPwcDeWrmcV8IksfBtIltV/KNThQbdl901EkB3Vx4p1SCnmFykE8aAxoIqazxhrsXQ9qYBPZOHbg2RSV/WyGamv4a4DgY/+NvbjVUJuecfS9VQI+huBMEd/w87+W+/pAoENJJdqgm55795Wbt1BxecnfnEekO5GIpSBpBf4/c5n43b1oHuE/gTSZ9l9W1b7xH//f14LoBQYYAAAAABJRU5ErkJggg==" 
            alt="Logo"
            className="w-32 mx-auto "
          />
        </Link>
      </div>
      
      <nav className="mt-[100px] px-2">
        <Button component={Link} to="/" className="w-full !justify-start !py-3 !text-lg !font-sans !text-white hover:!bg-gray-400">
          <RxDashboard className="mr-3" />
          Dashboard
        </Button>
        
        <Button
           component={Link} 
           to="/anpr" 
            className="w-full !justify-start !py-3 !text-white !text-lg  !font-sans hover:!bg-gray-400">
          <IoCameraOutline className=" mr-3 " />
          ANPR
        </Button>
        
        <Button 
          component={Link} 
          to="/fr" 
          className="w-full !justify-start !py-3 !text-white !text-lg !font-sans hover:!bg-gray-400"
        >
          <LuScanFace className="mr-3" />
          FR
        </Button>
        
        <Button 
            component={Link} 
            to="/setting"  
        className="w-full !justify-start !py-3 !text-white !text-lg !font-sans hover:!bg-gray-400">
          <IoSettingsOutline className="mr-3" />
          Settings
        </Button>
        
        <Button 
           component={Link} 
            to="https://enuvision.com/"  
        className="w-full !justify-start !py-3 !text-white !text-lg !font-sans hover:!bg-gray-400">
          <AiFillInfoCircle className="mr-3" />
          About Us
        </Button>
      </nav>
    </div>
  );
};

export default Sidebar;