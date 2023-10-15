import { Component, OnInit } from '@angular/core';
import { JsonServiceService } from '../json-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  LoggedUser: any;

  selectedImage: any;
  caption: any;
  allpost: any;
  myComment: any;
  Like: any;
  AllComments: any;
  AllLike: any;
  mergedData: any[] = [];
  constructor(private jsonService: JsonServiceService) {}

  ngOnInit() {
    this.LoggedUser = this.jsonService.getUser();
    console.log(this.LoggedUser);
    this.allposts();
    this.MyLike();

    this.allcoments();
  }

  allposts() {
    this.jsonService.AllPost().subscribe(
      (data) => {
        console.log(data);
        this.allpost = data;
        this.mergeData();
      },
      (err) => {
        console.error(err);
      }
    );
  }
  userLikedPost(postId: any): boolean {
    if (this.LoggedUser) {
      return this.AllLike.some(
        (like: any) =>
          like.LikesBy_Id === this.LoggedUser.id && like.postId === postId
      );
    }
    return false; // Return false if this.LoggedUser is not defined
  }
  
  MyLike() {
    this.jsonService.AllLike().subscribe(
      (data) => {
        this.AllLike = data;
        this.mergeData();
        console.log('AllLike', this.AllLike);
      },
      (err) => {
        console.error(err);
      }
    );
  }
  

  allcoments() {
    this.jsonService.AllComments().subscribe(
      (data) => {
        console.log('hjkdas', data);
        this.AllComments = data;
      },
      (err) => {
        console.error(err);
      }
    );
  }

  mergeData() {
    if (this.allpost && this.AllLike) {
      const likesCountMap: { [postId: number]: number } = {};

      this.AllLike.forEach((like: any) => {
        const postId = like.postId;
        likesCountMap[postId] = likesCountMap[postId]
          ? likesCountMap[postId] + 1
          : 1;
      });

      this.allpost.forEach((post: any) => {
        const postId = post.id;
        post.likesCount = likesCountMap[postId] || 0;
      });
    }
  }


  sendComment(postId: any) {
    const Comments = {
      CommentBy: this.LoggedUser.Username,
      Comments: this.myComment,
      CommentBy_Id: this.LoggedUser.id,
      postId: postId,
    };

    this.jsonService.sendComment(Comments).subscribe(
      (response) => {
        console.log('Comment sent successfully:', response);
        if (response) {
          this.allposts();
          this.MyLike();

          this.allcoments();
        }
      },
      (error) => {
        console.error('Error sending comment:', error);
      }
    );
  }

  post() {
    if (this.selectedImage) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        const base64Content = event.target.result;

        const postData = {
          Postedby: this.LoggedUser.Username,
          Image: base64Content,
          Caption: this.caption,
          Comment: [],
          id: null,
        };

        this.jsonService.postData(postData).subscribe(
          (response) => {
            console.log('Post successful:', response);
            if (response) {
              this.allposts();
              this.MyLike();

              this.allcoments();
            }
          },
          (error) => {
            console.error('Error:', error);
          }
        );
      };
      reader.readAsDataURL(this.selectedImage);
    }
  }

  onFileSelected(event: any) {
    this.selectedImage = event.target.files[0];
    this.readImage();
  }

  readImage() {
    if (this.selectedImage instanceof File) {
      const reader = new FileReader();

      reader.onload = (event: any) => {
        const base64Content = event.target.result;
        console.log('Base64 Content:', base64Content);
      };

      reader.readAsDataURL(this.selectedImage);
    } else {
      console.error('Invalid file selected');
    }
  }

  Likes(postId: any) {
    const Like = {
      LikesBy: this.LoggedUser.Username,
      LikesBy_Id: this.LoggedUser.id,
      postId: postId,
      Likes: 1,
    };

    this.jsonService.AllLike().subscribe(
      (data: any) => {
        const alreadyLiked = data.some(
          (like: any) =>
            like.LikesBy_Id === this.LoggedUser.id && like.postId === postId
        );

        if (alreadyLiked) {
          console.log('Already liked');
        } else {
          this.jsonService.sendLike(Like).subscribe(
            (response) => {
              console.log('Like sent successfully:', response);
              if (response) {
                this.allposts();
                this.MyLike();

                this.allcoments();
              }
            },
            (error) => {
              console.error('Error sending like:', error);
            }
          );
        }
      },
      (err) => {
        console.error(err);
      }
    );
  }
}
