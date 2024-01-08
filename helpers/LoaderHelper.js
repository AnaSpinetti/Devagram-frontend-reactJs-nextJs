export class LoaderHelper{
    static show(){
        document.querySelector('.loaderContainer')?.classList.remove('hide');
    }
    static hide(){
        document.querySelector('.loaderContainer')?.classList.add('hide');
    }
}