import { Product } from "./../product.model";
import { Router, ActivatedRoute } from "@angular/router";
import { ProductService } from "./../product.service";
import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-product-update",
    templateUrl: "./product-update.component.html",
    styleUrls: ["./product-update.component.css"],
})
export class ProductUpdateComponent implements OnInit {
    product: Product = {
        name: "",
        price: null,
    };
    constructor(
        private productService: ProductService,
        private router: Router,
        private route: ActivatedRoute
    ) {}
    updateProduct(): void {
        this.productService.update(this.product).subscribe((product) => {
            this.productService.showMessage("Produto atualizado!");
            console.log(product);
            this.router.navigate(["/products"]);
        });
    }
    cancel(): void {
        this.router.navigate(["/products"]);
    }
    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get("id");
        this.productService.readById(id).subscribe((product) => {
            this.product = product;
        });
    }
}
