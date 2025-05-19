import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ImageUploading from "react-images-uploading";
import Validator from "fastest-validator";
import back from "./img/back.svg";
import backWhite from "./img/backWhite.svg";
import { MyContext } from "../../components/hooks/context";
import { useSelector, useDispatch } from "react-redux";
import { loadingImage, setCreateErrors } from "../../store/actions";
import "./styles.scss";

const validationSchema = {
  title: {
    type: "string",
    min: 1,
    messages: { stringMin: "Заголовок слишком короткий" },
  },
  categoryId: {
    type: "number",
    min: 1,
    messages: { numberMin: "Требуется ID категории" },
  },
  summary: {
    type: "string",
    min: 1,
    messages: { stringMin: "Требуется описание" },
  },
};

const checkValidationData = (data) => {
  const validator = new Validator();
  const check = validator.compile(validationSchema);
  return check(data);
};

export const CreatePost = ({ createPost, categoryId, nav }) => {
  const ctx = useContext(MyContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const images = useSelector((state) => state.image);
  const errors = useSelector((state) => state.createPostErrors.errors);

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const goHome = () => {
    navigate(nav);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationResult = checkValidationData({
      title,
      categoryId,
      summary,
    });

    if (validationResult === true) {
      const data = {
        title,
        imageUrl: images[0]?.dataURL || "",
        summary,
        categoryId,
      };

      setIsLoading(true);
      try {
        const response = await createPost(data);
        if (response.id) {
          alert("Новость успешно добавлена!");
          navigate(nav);
        }
      } catch (error) {
        console.error("Ошибка при создании поста:", error);
        alert("Произошла ошибка при создании поста. Пожалуйста, попробуйте снова.");
      } finally {
        setIsLoading(false);
      }
    } else {
      dispatch(
        setCreateErrors(
          validationResult.reduce(
            (result, { field, message }) => ({ ...result, [field]: message }),
            {}
          )
        )
      );
    }
  };

  const handleChangeImage = (imagesList) => {
    dispatch(loadingImage(imagesList));
  };

  const makeErrorText = (field) => {
    return errors[field] ? (
      <span className="create__post-error">{errors[field]}</span>
    ) : null;
  };

   const handleReset = () => {
    setTitle("");
    setSummary("");
    dispatch(loadingImage([])); // Сбросить изображения, если необходимо
  };

  useEffect(() => {
    return () => {
      dispatch(setCreateErrors([]));
      dispatch(loadingImage([]));
    };
  }, [dispatch]);

  return (
    <div className={`create ${ctx.isBlackTheme ? "create__dark" : ""}`}>
      <div className="create__post">
        <div className="container">
          <button onClick={goHome} className="create__back-btn">
            <img
              className="create__back-img"
              src={back}
              alt="back"
            />
          </button>
          <h1 className="create__post-title">Добавить Новость</h1>
          <form className="create__post-form" onSubmit={handleSubmit} onReset={handleReset}>
            <div className="create__post-input_group">
              <input
                type="text"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Заголовок"
                className="create__post-input"
              />
              {makeErrorText("title")}
            </div>
            <div className="create__post-input_group">
              <input
                type="number"
                name="categoryId"
                value={categoryId}
                readOnly
                className="create__post-input"
              />
              {makeErrorText("categoryId")}
            </div>
            <div className="create__post-input_group">
              <textarea
                name="summary"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="Описание"
                className="create__post-input"
              />
              {makeErrorText("summary")}
            </div>
            <div className="create__post-input create__post-uploading">
              <ImageUploading value={images} onChange={handleChangeImage}>
                {({ imageList, onImageUpload }) => (
                  <div className="upload__image-wrapper">
                    <button
                      type="button"
                      onClick={onImageUpload}
                      className="upload__button"
                    >
                      Добавить фото
                    </button>
                    {imageList.map((image, index) => (
                      <div key={index} className="image__item">
                        <img
                          className="image__item-size"
                          src={image.dataURL}
                          alt=""
                          width="100"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </ImageUploading>
            </div>
            <div className="create__post-actions">
              <input
                type="reset"
                value="Очистить"
                className="create__post-btn create__post-cancel"
              />
              <input
                type="submit"
                value={isLoading ? "Создание..." : "Создать"}
                className="create__post-btn create__post-save"
                disabled={isLoading}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};